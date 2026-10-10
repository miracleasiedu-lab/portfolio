# Project images

One folder per project slug. Images are referenced from `src/data/projects.ts` (`thumbnail` and `gallery`).

To add a screenshot:
1. Save it as `.webp` or `.png` in `public/projects/<project-slug>/`.
2. Add an entry to that project's `gallery` (and optionally `thumbnail`) using the `img()` helper,
   with the image's real width and height in pixels.
