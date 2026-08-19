# Diona Task — WCB PDF Recreation

## Project summary

This project recreates two supplied WCB Manitoba forms as browser-based documents:

- Exercise 1: Medical and Travel Expense Request
- Exercise 2: Worker Progress Report

The goal was to reproduce the reference documents closely while keeping the content data-driven. The recreations include the supplied logo, headers, claim information, tables, form fields, checkboxes, narrative sections, footers, page numbers, browser pagination, and print styling.

## Technology and structure

The project uses only HTML, CSS, and vanilla JavaScript. It has no build step, package manager, framework, or third-party dependency.

- `exercise-1/` contains the Medical and Travel Expense Request.
- `exercise-2/` contains the Worker Progress Report.
- `shared/` contains reusable document creation, formatting, pagination, and print styles.
- `assets/` contains the locally stored WCB logo and checkbox assets.
- The supplied PDF references were used during development and are not required to run the project.

## How to run

Open either `exercise-1/index.html` or `exercise-2/index.html` directly in a modern browser. No server or installation is required.

Each exercise has a `Print / Save PDF` button. It opens the browser's native print dialog, where the user can choose Save as PDF. The dataset controls and print button are hidden from the printed document.

## Dynamic data demonstration

The forms are rendered from JavaScript data objects rather than duplicated static HTML.

Exercise 1 includes these datasets:

- `sample`
- `extended` — contains multiple records in repeated expense tables.
- `minimal` — demonstrates empty and partially populated sections.

Exercise 2 includes:

- `sample`
- `ongoing-recovery` — demonstrates populated recovery, treatment, medication, and exercise fields.
- `minimal` — demonstrates blank and alternate status values.

Dataset links are available at the top of each exercise. They can also be selected with URLs such as `exercise-1/index.html?dataset=extended`. Changing the data changes the displayed names, claim details, dates, statuses, table rows, amounts, checkboxes, and narrative values without rewriting the HTML structure.

## Why there is a gap between browser pages

The small gap visible between page sheets in the browser is intentional screen-only presentation spacing. It helps distinguish one PDF-like letter page from the next while scrolling through the document. The gap is created by the shared `.pages` container's `gap: 10px` rule; it is not an extra document margin, footer reservation, or blank page.

When printing, the `@media print` rules set the pages container gap to `0`, use letter-sized pages, hide the browser-only controls, and preserve the document's intended page breaks. Therefore the screen gap does not add whitespace to the saved PDF.

## Implementation approach

JavaScript selects the requested dataset and creates the document nodes. Shared helpers format dates and currency, create headers and footers, render checkboxes, build repeated table rows, and paginate content. CSS defines the letter-page dimensions, typography, borders, tables, form-like fields, screen presentation, and print behavior.

The supplied PDFs were the visual source of truth during development. They are not included in the cleaned submission repository. Longer demonstration datasets may require additional pages than the reference sample documents: the sample layouts are Exercise 1 = 2 pages and Exercise 2 = 3 pages.

## Verification

The six existing datasets were opened in Chromium at a document-sized viewport. Page numbering, dynamic values, repeated table rows, headers, footers, and dataset switching were checked. Browser print-to-PDF produced the expected sample lengths: Exercise 1 produced 2 pages and Exercise 2 produced 3 pages. The assignment also requires separate narrated demonstration videos; those are submission artifacts outside this code-only project.

## AI assistance

AI assistance was used selectively and is disclosed in [AI-PROMPTS.md](AI-PROMPTS.md). The developer worked through the requirements, form structure, HTML, CSS, JavaScript data model, dynamic behavior, layout decisions, and verification for both exercises.
