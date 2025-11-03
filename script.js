document.addEventListener('DOMContentLoaded', () => {
	const carousels = document.querySelectorAll('[data-carousel]');
	carousels.forEach(setupCarousel);
});

function setupCarousel(root) {
	const track = root.querySelector('[data-carousel-track]');
	const frame = root.querySelector('[data-carousel-frame]');
	const prevBtn = root.querySelector('[data-carousel-prev]');
	const nextBtn = root.querySelector('[data-carousel-next]');
	const dotsWrapper = root.querySelector('[data-carousel-dots]');
	let slides = Array.from(root.querySelectorAll('[data-carousel-slide]'));

	if (slides.length === 0 && track) {
		const imagesAttr = root.dataset.images || '';
		const filenames = imagesAttr.split(',').map(name => name.trim()).filter(Boolean);
		if (filenames.length > 0) {
			const basePathRaw = root.dataset.imagePath || '';
			const basePath = basePathRaw && !basePathRaw.endsWith('/') ? `${basePathRaw}/` : basePathRaw;
			const altTemplate = root.dataset.altTemplate || 'Photo {index}';
			filenames.forEach((filename, idx) => {
				const figure = document.createElement('figure');
				figure.className = 'carousel-slide';
				figure.setAttribute('data-carousel-slide', '');

				const img = document.createElement('img');
				img.src = `${basePath}${filename}`;
				const altText = altTemplate.includes('{index}')
					? altTemplate.replace('{index}', idx + 1)
					: `${altTemplate} ${idx + 1}`;
				img.alt = altText;
				img.loading = 'lazy';
				img.decoding = 'async';

				figure.appendChild(img);
				track.appendChild(figure);
			});
			slides = Array.from(root.querySelectorAll('[data-carousel-slide]'));
		}
	}

	let dots = dotsWrapper ? Array.from(dotsWrapper.querySelectorAll('[data-carousel-dot]')) : [];

	if (!track || slides.length === 0) {
		return;
	}

	let currentIndex = slides.findIndex(slide => slide.classList.contains('is-active'));
	if (currentIndex === -1) {
		currentIndex = 0;
		slides[0].classList.add('is-active');
	}

	const totalSlides = slides.length;

	if (dotsWrapper) {
		if (dots.length !== totalSlides) {
			dotsWrapper.innerHTML = '';
			dots = slides.map((_, idx) => {
				const dot = document.createElement('button');
				dot.type = 'button';
				dot.className = 'carousel-dot';
				dot.setAttribute('data-carousel-dot', '');
				dot.setAttribute('aria-label', `View photo ${idx + 1}`);
				dot.setAttribute('role', 'tab');
				dot.setAttribute('aria-selected', idx === currentIndex ? 'true' : 'false');
				dot.setAttribute('tabindex', idx === currentIndex ? '0' : '-1');
				dotsWrapper.appendChild(dot);
				return dot;
			});
		}
	}

	const hideControls = totalSlides <= 1;
	if (hideControls) {
		prevBtn?.setAttribute('hidden', '');
		nextBtn?.setAttribute('hidden', '');
		dotsWrapper?.setAttribute('hidden', '');
		slides.forEach((slide, idx) => {
			slide.setAttribute('aria-hidden', idx === currentIndex ? 'false' : 'true');
		});
		root.style.setProperty('--active-index', currentIndex);
		frame?.classList.remove('is-dragging');
		return;
	}

	const updateSlides = () => {
		slides.forEach((slide, idx) => {
			const isActive = idx === currentIndex;
			slide.classList.toggle('is-active', isActive);
			slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
		});

		root.style.setProperty('--active-index', currentIndex);

		dots.forEach((dot, idx) => {
			const isActive = idx === currentIndex;
			dot.classList.toggle('is-active', isActive);
			dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
			dot.setAttribute('tabindex', isActive ? '0' : '-1');
		});
	};

	const goTo = (index) => {
		currentIndex = (index + totalSlides) % totalSlides;
		updateSlides();
	};

	prevBtn?.addEventListener('click', () => goTo(currentIndex - 1));
	nextBtn?.addEventListener('click', () => goTo(currentIndex + 1));

	dots.forEach((dot, idx) => {
		dot.addEventListener('click', () => goTo(idx));
		dot.addEventListener('keydown', (event) => {
			if (event.key === 'ArrowLeft') {
				event.preventDefault();
				goTo(currentIndex - 1);
				dots[currentIndex]?.focus();
			}
			if (event.key === 'ArrowRight') {
				event.preventDefault();
				goTo(currentIndex + 1);
				dots[currentIndex]?.focus();
			}
		});
	});

	const dragState = {
		isDragging: false,
		startX: 0,
		currentX: 0,
	};

	const startDrag = (clientX) => {
		dragState.isDragging = true;
		dragState.startX = clientX;
		dragState.currentX = clientX;
		track.style.transition = 'none';
		frame?.classList.add('is-dragging');
	};

	const moveDrag = (clientX) => {
		if (!dragState.isDragging) {
			return;
		}
		dragState.currentX = clientX;
		const delta = dragState.currentX - dragState.startX;
		const offset = -currentIndex * root.offsetWidth + delta;
		track.style.transform = `translateX(${offset}px)`;
	};

	const endDrag = () => {
		if (!dragState.isDragging) {
			return;
		}

		const delta = dragState.currentX - dragState.startX;
		const threshold = root.offsetWidth * 0.2;
		track.style.removeProperty('transition');
		track.style.removeProperty('transform');
		frame?.classList.remove('is-dragging');
		dragState.isDragging = false;

		if (Math.abs(delta) > threshold) {
			goTo(delta < 0 ? currentIndex + 1 : currentIndex - 1);
		} else {
			updateSlides();
		}
	};

	const handleTouchStart = (event) => startDrag(event.touches[0].clientX);
	const handleTouchMove = (event) => moveDrag(event.touches[0].clientX);
	const handleTouchEnd = () => endDrag();

	track.addEventListener('touchstart', handleTouchStart, { passive: true });
	track.addEventListener('touchmove', handleTouchMove, { passive: true });
	track.addEventListener('touchend', handleTouchEnd);
	track.addEventListener('touchcancel', endDrag);

	track.addEventListener('mousedown', (event) => {
		event.preventDefault();
		startDrag(event.clientX);
	});

	window.addEventListener('mousemove', (event) => moveDrag(event.clientX));
	window.addEventListener('mouseup', endDrag);

	updateSlides();
}
