/**
 * Image Accessibility Usage Examples
 *
 * This file demonstrates how to use the imageAccessibility metadata
 * in your React components for proper accessibility (WCAG 2.1 AA compliant)
 */

import {
  getImageAccessibility,
  getAccessibilityByCategory,
  getAllAccessibilityMetadata,
} from "@/data";
import { useImageUrl } from "@/hooks/useWikipediaImage";

/**
 * Example 1: Basic image with accessibility metadata
 *
 * Usage in a React component:
 */
export function ImageWithAccessibility({
  imageId,
  src,
}: {
  imageId: string;
  src: string;
}) {
  const accessibility = getImageAccessibility(imageId);

  if (!accessibility) {
    return <img src={src} alt="Image" />;
  }

  return (
    <figure>
      <img
        src={src}
        alt={accessibility.altText}
        title={accessibility.title}
        aria-describedby={`${imageId}-description`}
      />
      <figcaption id={`${imageId}-description`}>
        {accessibility.ariaDescription}
      </figcaption>
    </figure>
  );
}

/**
 * Example 2: Gallery with accessibility information
 */
export function AccessibilityGallery() {
  const allMetadata = getAllAccessibilityMetadata();

  return (
    <section aria-labelledby="gallery-title">
      <h2 id="gallery-title">Pioneering Women in Tech Gallery</h2>
      <div
        role="region"
        aria-label="Image gallery with detailed accessibility descriptions"
      >
        {allMetadata.map((metadata) => (
          <article
            key={metadata.id}
            aria-label={`${metadata.name}, ${metadata.role}`}
          >
            <h3>{metadata.name}</h3>
            <img
              src={useImageUrl(`/images/${metadata.id}.jpg`)}
              alt={metadata.altText}
              title={metadata.title}
              aria-describedby={`${metadata.id}-desc`}
            />
            <p id={`${metadata.id}-desc`}>{metadata.ariaDescription}</p>
            <p>
              <strong>Title:</strong> {metadata.title}
            </p>
            <p>
              <strong>Role:</strong> {metadata.role}
            </p>
            <p>
              <strong>Category:</strong> {metadata.category}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/**
 * Example 3: Filterable gallery by category
 */
export function AccessibilityGalleryByCategory() {
  const byCategory = getAccessibilityByCategory();

  return (
    <section>
      <h2>Women in Tech by Category</h2>
      {Object.entries(byCategory).map(([category, metadata]) => (
        <section key={category} aria-labelledby={`${category}-heading`}>
          <h3 id={`${category}-heading`}>{category}</h3>
          <ul aria-label={`List of ${category}`}>
            {metadata.map((person) => (
              <li key={person.id}>
                <article>
                  <h4>{person.name}</h4>
                  <img
                    src={useImageUrl(`/images/${person.id}.jpg`)}
                    alt={person.altText}
                    title={person.title}
                    aria-describedby={`${person.id}-full-description`}
                  />
                  <div id={`${person.id}-full-description`}>
                    <p>{person.ariaDescription}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}

/**
 * Example 4: Image card with proper ARIA labels
 */
export function ImageCard({ imageId }: { imageId: string }) {
  const accessibility = getImageAccessibility(imageId);

  if (!accessibility) {
    return null;
  }

  return (
    <div
      className="image-card"
      role="article"
      aria-label={`${accessibility.name}, ${accessibility.role}`}
    >
      <div className="image-container">
        <img
          src={useImageUrl(`/images/${accessibility.id}.jpg`)}
          alt={accessibility.altText}
          title={accessibility.title}
          loading="lazy"
          aria-describedby={`${imageId}-aria-desc`}
        />
      </div>

      <div className="card-content">
        <h3>{accessibility.name}</h3>
        <p className="role">
          <strong>Role:</strong> {accessibility.role}
        </p>
        <p className="title">
          <strong>Title:</strong> {accessibility.title}
        </p>
        <p className="category">
          <strong>Category:</strong> {accessibility.category}
        </p>

        {/* Hidden from visual users but visible to screen readers */}
        <p id={`${imageId}-aria-desc`} className="sr-only">
          {accessibility.ariaDescription}
        </p>
      </div>
    </div>
  );
}

/**
 * Example 5: Proper heading hierarchy with accessibility
 */
export function TimelineWithAccessibility() {
  const byCategory = getAccessibilityByCategory();

  return (
    <main>
      <h1>Pioneering Women in Technology</h1>
      <p>
        Explore the stories and contributions of groundbreaking women in
        technology across different eras and fields.
      </p>

      <nav aria-label="Category navigation">
        <ul>
          {Object.keys(byCategory).map((category) => (
            <li key={category}>
              <a href={`#${category.replace(/\s+/g, "-").toLowerCase()}`}>
                {category}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {Object.entries(byCategory).map(([category, metadata]) => (
        <section
          key={category}
          id={category.replace(/\s+/g, "-").toLowerCase()}
          aria-labelledby={`${category}-title`}
        >
          <h2 id={`${category}-title`}>{category}</h2>

          <div className="people-grid">
            {metadata.map((person) => (
              <div
                key={person.id}
                className="person-item"
                role="article"
                aria-label={person.name}
              >
                <div className="image-wrapper">
                  <img
                    src={useImageUrl(`/images/cat/categories.md`)}
                    alt={person.altText}
                    title={person.title}
                    aria-describedby={`${person.id}-description`}
                  />
                </div>
                <div className="person-info">
                  <h3>{person.name}</h3>
                  <p className="role">{person.role}</p>
                  <p className="title">{person.title}</p>
                </div>

                {/* Full description for screen reader users */}
                <div id={`${person.id}-description`} className="sr-only">
                  {person.ariaDescription}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

/**
 * Example 6: Using with a detail modal/view
 */
export function DetailView({ imageId }: { imageId: string }) {
  const accessibility = getImageAccessibility(imageId);

  if (!accessibility) {
    return <div>No information found</div>;
  }

  return (
    <article
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${imageId}-modal-title`}
      aria-describedby={`${imageId}-modal-description`}
    >
      <h2 id={`${imageId}-modal-title`}>{accessibility.name}</h2>

      <div className="modal-content">
        <img
          src={useImageUrl(`/images/${accessibility.id}.jpg`)}
          alt={accessibility.altText}
          title={accessibility.title}
          aria-describedby={`${imageId}-full-desc`}
        />

        <div className="details">
          <dl>
            <dt>Name</dt>
            <dd>{accessibility.name}</dd>

            <dt>Professional Title</dt>
            <dd>{accessibility.title}</dd>

            <dt>Primary Role</dt>
            <dd>{accessibility.role}</dd>

            <dt>Category</dt>
            <dd>{accessibility.category}</dd>

            <dt>Description</dt>
            <dd id={`${imageId}-full-desc`}>{accessibility.ariaDescription}</dd>
          </dl>
        </div>
      </div>
    </article>
  );
}

/**
 * CSS for screen reader only content
 *
 * Add this to your global styles:
 *
 * .sr-only {
 *   position: absolute;
 *   width: 1px;
 *   height: 1px;
 *   padding: 0;
 *   margin: -1px;
 *   overflow: hidden;
 *   clip: rect(0, 0, 0, 0);
 *   white-space: nowrap;
 *   border-width: 0;
 * }
 */
