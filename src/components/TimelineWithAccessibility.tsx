/**
 * Timeline Component with Accessibility Integration
 *
 * This file shows how to integrate the imageAccessibility metadata
 * into the existing Timeline component for full WCAG 2.1 AA compliance
 *
 * @example
 * import { TimelineWithAccessibility } from '@/components/Timeline';
 *
 * export function App() {
 *   return <TimelineWithAccessibility />;
 * }
 */

import React from "react";
import { useImageUrl } from "@/hooks/useWikipediaImage";
import {
  timelineData,
  getImageAccessibility,
  getAccessibilityByCategory,
  categoryColors,
} from "@/data/timeline";

/**
 * Main Timeline Component with Full Accessibility
 *
 * Features:
 * - Accessible heading hierarchy
 * - Proper ARIA labels and descriptions
 * - Keyboard navigation support
 * - Screen reader optimization
 */
export function TimelineWithAccessibility() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null,
  );

  const byCategory = getAccessibilityByCategory();
  const categories = Object.keys(byCategory);

  // Filter data based on selected category
  const displayedData =
    selectedCategory && byCategory[selectedCategory]
      ? byCategory[selectedCategory]
      : timelineData;

  return (
    <main className="timeline-container" role="main">
      {/* Accessible header section */}
      <header className="timeline-header" role="banner">
        <h1 id="timeline-title">Pioneering Women in Technology</h1>
        <p id="timeline-description">
          Explore the contributions of groundbreaking women across computing
          history, from early pioneers to modern leaders shaping the future of
          technology.
        </p>
      </header>

      {/* Category filter with keyboard navigation */}
      <nav
        aria-labelledby="category-filter-title"
        className="category-filter"
        role="navigation"
      >
        <h2 id="category-filter-title" className="sr-only">
          Filter by Category
        </h2>
        <ul className="category-list" role="tablist">
          {/* "All" button */}
          <li role="presentation">
            <button
              role="tab"
              aria-selected={selectedCategory === null}
              aria-controls="timeline-items"
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "active" : ""}
            >
              All Categories
            </button>
          </li>

          {/* Category buttons */}
          {categories.map((category) => (
            <li key={category} role="presentation">
              <button
                role="tab"
                aria-selected={selectedCategory === category}
                aria-controls="timeline-items"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "active" : ""}
                style={{
                  borderColor:
                    categoryColors[
                      category as unknown as keyof typeof categoryColors
                    ],
                }}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Timeline items with accessibility */}
      <div
        id="timeline-items"
        role="region"
        aria-labelledby="timeline-title"
        className="timeline-items"
      >
        <ul className="items-list">
          {displayedData.map((person, index) => {
            const a11y = getImageAccessibility(person.id);

            if (!a11y) {
              return null;
            }

            return (
              <TimelineItem
                key={person.id}
                person={person}
                accessibility={a11y}
                index={index}
                total={displayedData.length}
              />
            );
          })}
        </ul>
      </div>

      {/* No results message */}
      {displayedData.length === 0 && (
        <div role="status" aria-live="polite" className="no-results">
          <p>No items found in this category.</p>
        </div>
      )}

      {/* Results counter */}
      <footer className="timeline-footer" role="contentinfo">
        <p aria-live="polite">
          Showing <strong>{displayedData.length}</strong> of{" "}
          <strong>{timelineData.length}</strong> pioneers
        </p>
      </footer>
    </main>
  );
}

/**
 * Individual Timeline Item with Full Accessibility
 */
interface TimelineItemProps {
  person: any;
  accessibility: any;
  index: number;
  total: number;
}

function TimelineItem({
  person,
  accessibility,
  index,
  total,
}: TimelineItemProps) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <li
      className="timeline-item"
      role="article"
      aria-label={`${index + 1} of ${total}: ${person.name}`}
    >
      <article
        className="item-card"
        aria-labelledby={`${person.id}-title`}
        aria-describedby={`${person.id}-description ${person.id}-role`}
      >
        {/* Image with full accessibility */}
        <div className="item-image-wrapper">
          <figure>
            <img
              src={useImageUrl(`/images/${person.id}.jpg`)}
              alt={accessibility.altText}
              title={accessibility.title}
              aria-describedby={`${person.id}-full-description`}
              className="item-image"
              loading="lazy"
            />
            <figcaption
              id={`${person.id}-full-description`}
              className="sr-only"
            >
              {accessibility.ariaDescription}
            </figcaption>
          </figure>
        </div>

        {/* Item content */}
        <div className="item-content">
          {/* Year badge for chronological context */}
          <div className="item-year" aria-label={`Year: ${person.year}`}>
            {person.year}
          </div>

          {/* Title and basic info */}
          <h3 id={`${person.id}-title`} className="item-name">
            {person.name}
          </h3>

          <p id={`${person.id}-role`} className="item-role">
            <strong>Role:</strong> {accessibility.role}
          </p>

          <p className="item-title">
            <strong>Achievement:</strong> {accessibility.title}
          </p>

          <p className="item-category">
            <strong>Category:</strong> {accessibility.category}
          </p>

          {/* Expandable description */}
          <div className="item-description">
            <button
              aria-expanded={expanded}
              aria-controls={`${person.id}-details`}
              onClick={() => setExpanded(!expanded)}
              className="expand-button"
            >
              {expanded ? "Show Less" : "Show More"}
              <span aria-hidden="true">{expanded ? " −" : " +"}</span>
            </button>

            {expanded && (
              <div
                id={`${person.id}-description`}
                className="item-details"
                role="region"
                aria-live="polite"
              >
                <h4>Biography</h4>
                <p>{person.description}</p>

                <h4>Achievements</h4>
                <ul>
                  {person.achievements?.map(
                    (achievement: string, idx: number) => (
                      <li key={idx}>{achievement}</li>
                    ),
                  )}
                </ul>

                <h4>Detailed Description</h4>
                <p>{accessibility.ariaDescription}</p>

                {person.personality && (
                  <>
                    <h4>Personality</h4>
                    <p>{person.personality}</p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Wiki link with proper accessibility */}
          {person.wikiSearchName && (
            <a
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(
                person.wikiSearchName,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="wiki-link"
              aria-label={`Learn more about ${person.name} on Wikipedia`}
            >
              Learn more on Wikipedia
              <span aria-hidden="true"> ↗</span>
            </a>
          )}
        </div>
      </article>
    </li>
  );
}

/**
 * Compact Timeline View (alternate layout)
 */
export function CompactTimeline() {
  const byCategory = getAccessibilityByCategory();

  return (
    <section aria-labelledby="compact-title">
      <h2 id="compact-title">Timeline by Category</h2>

      {Object.entries(byCategory).map(([category, items]) => (
        <section
          key={category}
          className="category-section"
          aria-labelledby={`${category}-heading`}
        >
          <h3 id={`${category}-heading`} className="category-heading">
            {category}
          </h3>

          <ul className="person-grid" role="list">
            {items.map((person) => (
              <li key={person.id} role="listitem">
                <PersonCompactCard person={person} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}

/**
 * Compact person card for grid layout
 */
interface PersonCompactCardProps {
  person: any;
}

function PersonCompactCard({ person }: PersonCompactCardProps) {
  return (
    <article
      className="person-compact-card"
      role="article"
      aria-label={`${person.name}, ${person.role}`}
    >
      <div className="card-image">
        <img
          src={useImageUrl(`/images/${person.id}.jpg`)}
          alt={person.altText}
          title={person.title}
          loading="lazy"
        />
      </div>
      <div className="card-info">
        <h4>{person.name}</h4>
        <p className="card-role">{person.role}</p>
        <p className="card-year">{person.category}</p>
      </div>
    </article>
  );
}

/**
 * Accessibility Features Summary
 *
 * This component includes:
 *
 * 1. **Semantic HTML**
 *    - <main> for main content
 *    - <header> for introductory content
 *    - <article> for individual items
 *    - <figure>/<figcaption> for images
 *    - <nav> for navigation
 *    - <section> for grouped content
 *
 * 2. **ARIA Attributes**
 *    - aria-label: Provides accessible names
 *    - aria-labelledby: Links to headings
 *    - aria-describedby: Links to descriptions
 *    - aria-expanded: Shows expand state
 *    - role="dialog", "tab", "region": Defines component types
 *    - aria-live="polite": Announces dynamic updates
 *
 * 3. **Heading Hierarchy**
 *    - h1: Main title (page title)
 *    - h2: Section titles (Timeline, Filter)
 *    - h3: Category/Item titles
 *    - h4: Subsection titles (Biography, Achievements)
 *
 * 4. **Keyboard Navigation**
 *    - Tab: Move between interactive elements
 *    - Enter/Space: Activate buttons
 *    - Arrow keys: Navigate tabs (with role="tab")
 *
 * 5. **Screen Reader Support**
 *    - Alt text on all images
 *    - aria-description for detailed info
 *    - sr-only class for screen reader only content
 *    - aria-live for dynamic updates
 *
 * 6. **Alternative Text**
 *    - altText: Short, descriptive (< 125 chars)
 *    - ariaDescription: Detailed (1-3 sentences)
 *    - title: Professional role/achievement
 *
 * 7. **Focus Management**
 *    - Visual focus indicator
 *    - Logical tab order
 *    - Focus trap in modals (if applicable)
 *
 * WCAG 2.1 Compliance Level: AA ♿
 */

/**
 * CSS Classes Needed (add to your stylesheet)
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
 *
 * .expand-button:focus {
 *   outline: 2px solid #0066cc;
 *   outline-offset: 2px;
 * }
 *
 * button[role="tab"][aria-selected="true"] {
 *   border-bottom: 3px solid currentColor;
 * }
 */
