(function () {
  function createElement(tagName, className, textContent) {
    const node = document.createElement(tagName);
    if (className) {
      node.className = className;
    }
    if (textContent !== undefined && textContent !== null) {
      node.textContent = textContent;
    }
    return node;
  }

  function createFragmentFromHTML(markup) {
    const template = document.createElement("template");
    template.innerHTML = markup.trim();
    return template.content;
  }

  function formatDate(value, options) {
    if (!value) {
      return "";
    }

    if (typeof value === "string") {
      const dateOnlyMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (dateOnlyMatch) {
        const year = Number(dateOnlyMatch[1]);
        const month = Number(dateOnlyMatch[2]) - 1;
        const day = Number(dateOnlyMatch[3]);
        return formatDate(new Date(year, month, day), options);
      }
    }

    if (value instanceof Date) {
      return value.toLocaleDateString("en-CA", options || {
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    }

    if (typeof value === "string") {
      if (/^[A-Za-z]+\s+\d{1,2},\s+\d{4}$/.test(value)) {
        return value;
      }

      const parsed = new Date(value);
      if (!Number.isNaN(parsed.getTime())) {
        return formatDate(parsed, options);
      }

      return value;
    }

    return String(value);
  }

  function formatCurrency(value) {
    if (value === null || value === undefined || value === "") {
      return "";
    }

    if (typeof value === "string" && value.trim().startsWith("$")) {
      return value;
    }

    const number = Number(value);
    if (Number.isNaN(number)) {
      return String(value);
    }

    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(number);
  }

  function formatDateTime(value) {
    if (!value) {
      return "";
    }

    if (typeof value === "string" && /Submitted:\s*/.test(value)) {
      return value.replace(/^Submitted:\s*/, "");
    }

    if (typeof value === "string") {
      const localDateTimeMatch = value.match(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/
      );

      if (localDateTimeMatch) {
        const parsedLocal = new Date(
          Number(localDateTimeMatch[1]),
          Number(localDateTimeMatch[2]) - 1,
          Number(localDateTimeMatch[3]),
          Number(localDateTimeMatch[4]),
          Number(localDateTimeMatch[5]),
          Number(localDateTimeMatch[6] || 0)
        );
        return formatDateTime(parsedLocal);
      }
    }

    const parsed = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return String(value);
    }

    const date = formatDate(parsed);
    const hours = String(parsed.getHours()).padStart(2, "0");
    const minutes = String(parsed.getMinutes()).padStart(2, "0");
    return date + " " + hours + ":" + minutes;
  }

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function textOrEmpty(value, emptyLabel) {
    if (value === null || value === undefined || value === "") {
      return emptyLabel || "";
    }
    return String(value);
  }

  function buildCheckbox(checked, label) {
    const wrapper = createElement("span", "option-item");
    wrapper.classList.add("option-item--inline");

    const box = createElement("span", "checkbox" + (checked ? " is-checked" : ""));
    box.setAttribute("aria-hidden", "true");
    wrapper.appendChild(box);

    const text = createElement("span", "option-item__label", label);
    wrapper.appendChild(text);
    return wrapper;
  }

  function buildHeader(config) {
    const header = createElement("header", "doc-header");

    const logoWrap = createElement("div", "doc-header__logo-wrap");
    const logo = createElement("img", "doc-header__logo");
    logo.src = config.logoPath;
    logo.alt = config.logoAlt || "Workers Compensation Board of Manitoba";
    logoWrap.appendChild(logo);

    const contact = createElement("div", "doc-header__contact");
    [
      config.contact.addressLine1,
      config.contact.addressLine2,
      "Phone: " + config.contact.phone,
      "Toll Free: " + config.contact.tollFree,
      config.contact.website
    ].forEach(function (line) {
      contact.appendChild(createElement("div", "", line));
    });

    const titleWrap = createElement("div", "doc-header__title-wrap");
    titleWrap.appendChild(createElement("h1", "doc-header__title", config.title));

    const claimRow = createElement("div", "doc-header__claim-row");
    claimRow.appendChild(createElement("div", "claim-box", "Claim No. " + config.claimNumber));

    if (config.badge) {
      claimRow.appendChild(createElement("div", "claim-box claim-box--small", config.badge));
    }

    titleWrap.appendChild(claimRow);

    header.appendChild(logoWrap);
    header.appendChild(contact);
    header.appendChild(titleWrap);

    return header;
  }

  function buildFooterNode(footerConfig, pageNumber, totalPages) {
    const wrapper = createElement("div", "page__footer");
    const left = createElement("div", "page__footer-left");
    const right = createElement("div", "page__footer-right");

    if (footerConfig && typeof footerConfig.render === "function") {
      const custom = footerConfig.render({
        pageNumber: pageNumber,
        totalPages: totalPages,
        createElement: createElement,
        left: left,
        right: right
      });

      if (custom) {
        wrapper.innerHTML = "";
        wrapper.appendChild(custom);
        return wrapper;
      }
    }

    const workerLine = createElement("div", "page__footer-line");
    workerLine.textContent = "Worker App ID: " + textOrEmpty(footerConfig.appId);
    left.appendChild(workerLine);

    const submittedLine = createElement("div", "page__footer-line");
    submittedLine.textContent = "Submitted: " + formatDateTime(footerConfig.submittedAt);
    right.appendChild(submittedLine);

    const pageLine = createElement("div", "page__footer-line");
    pageLine.textContent = "Page " + pageNumber + " of " + totalPages;
    right.appendChild(pageLine);

    wrapper.appendChild(left);
    wrapper.appendChild(right);
    return wrapper;
  }

  function createPage(root, footerConfig) {
    const page = createElement("article", "page");
    const body = createElement("div", "page__body");
    const footerSlot = createElement("div", "page__footer-slot");

    page.appendChild(body);
    page.appendChild(footerSlot);
    root.appendChild(page);

    return {
      page: page,
      body: body,
      footerSlot: footerSlot,
      footerConfig: footerConfig
    };
  }

  function createPaginator(options) {
    const pages = [];
    let currentPage = null;

    function ensurePage() {
      if (!currentPage) {
        currentPage = createPage(options.root, options.footer);
        pages.push(currentPage);
      }
      return currentPage;
    }

    function hasOverflow(page) {
      return page.body.scrollHeight - page.body.clientHeight > 1;
    }

    function beginNewPage() {
      currentPage = null;
      return ensurePage();
    }

    function appendNode(node) {
      const page = ensurePage();
      page.body.appendChild(node);

      if (!hasOverflow(page)) {
        return page;
      }

      node.remove();
      const freshPage = beginNewPage();
      freshPage.body.appendChild(node);

      if (hasOverflow(freshPage)) {
        freshPage.body.classList.add("page__body--overflow");
      }

      return freshPage;
    }

    function pageBreak() {
      currentPage = null;
    }

    function appendTableSection(section) {
      const rows = Array.isArray(section.rows) ? section.rows.slice() : [];
      const showEmptyRow = rows.length === 0;
      let index = 0;
      let firstChunk = true;

      do {
        const page = ensurePage();
        const block = buildTableSectionShell(section, firstChunk);
        page.body.appendChild(block.wrapper);

        if (hasOverflow(page)) {
          block.wrapper.remove();
          if (page.body.childElementCount === 0) {
            page.body.appendChild(block.wrapper);
            page.body.classList.add("page__body--overflow");
          } else {
            currentPage = null;
            continue;
          }
        }

        if (showEmptyRow && firstChunk) {
          block.tbody.appendChild(buildEmptyTableRow(section.columns.length, section.emptyMessage || "No entries provided."));
        }

        let addedRows = false;

        while (index < rows.length) {
          const rowNode = buildTableRow(section, rows[index], index);
          block.tbody.appendChild(rowNode);

          if (hasOverflow(page)) {
            rowNode.remove();

            if (!addedRows) {
              block.wrapper.remove();
              currentPage = null;
            } else {
              currentPage = null;
            }
            break;
          }

          addedRows = true;
          index += 1;
        }

        firstChunk = false;

        if (showEmptyRow) {
          break;
        }
      } while (index < rows.length);
    }

    function finish() {
      const totalPages = pages.length;
      pages.forEach(function (page, index) {
        page.footerSlot.innerHTML = "";
        page.footerSlot.appendChild(buildFooterNode(page.footerConfig, index + 1, totalPages));
      });
      return pages;
    }

    return {
      appendNode: appendNode,
      appendTableSection: appendTableSection,
      pageBreak: pageBreak,
      beginNewPage: beginNewPage,
      finish: finish
    };
  }

  function buildTableSectionShell(section, isFirstChunk) {
    const wrapper = createElement("section", "section-block");
    const title = createElement("h2", "section-title", section.title);
    wrapper.appendChild(title);

    if (section.note && (isFirstChunk || section.repeatNoteOnSplit)) {
      const note = createElement("p", "section-note", section.note);
      wrapper.appendChild(note);
    }

    const table = createElement("table", "document-table");
    const colgroup = createElement("colgroup");
    section.columns.forEach(function (column) {
      const col = createElement("col");
      if (column.width) {
        col.style.width = column.width;
      }
      colgroup.appendChild(col);
    });

    const thead = createElement("thead");
    const headerRow = createElement("tr");
    section.columns.forEach(function (column) {
      const th = createElement("th", "", column.label);
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    const tbody = createElement("tbody");

    table.appendChild(colgroup);
    table.appendChild(thead);
    table.appendChild(tbody);
    wrapper.appendChild(table);

    return {
      wrapper: wrapper,
      tbody: tbody
    };
  }

  function buildTableRow(section, row, index) {
    const tr = createElement("tr");
    const cells = section.getCells(row, index);

    cells.forEach(function (cell) {
      const descriptor = typeof cell === "object" && cell !== null ? cell : { text: cell };
      const td = createElement("td");
      const hasText =
        descriptor.text !== undefined &&
        descriptor.text !== null &&
        String(descriptor.text) !== "";

      if (descriptor.className) {
        td.className = descriptor.className;
      }
      if (descriptor.html) {
        td.appendChild(createFragmentFromHTML(descriptor.html));
      } else {
        td.textContent = hasText ? String(descriptor.text) : "";
      }
      if (!hasText && !descriptor.html) {
        td.classList.add("is-empty");
      }
      tr.appendChild(td);
    });

    return tr;
  }

    function buildEmptyTableRow(columnCount, emptyMessage) {
      const tr = createElement("tr");
    const td = createElement("td", "is-empty", emptyMessage || "");
      td.colSpan = columnCount;
      tr.appendChild(td);
      return tr;
  }

  function readDataset(nameMap, fallbackKey) {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("dataset");
    if (key && nameMap[key]) {
      return {
        key: key,
        value: nameMap[key]
      };
    }
    return {
      key: fallbackKey,
      value: nameMap[fallbackKey]
    };
  }

  function buildDatasetLinks(root, basePath, currentKey, items) {
    const linkWrap = root.querySelector("[data-dataset-links]");
    if (!linkWrap) {
      return;
    }

    items.forEach(function (item) {
      const link = createElement("a", currentKey === item.key ? "is-active" : "", item.label);
      link.href = basePath + "?dataset=" + encodeURIComponent(item.key);
      linkWrap.appendChild(link);
    });
  }

  window.DocumentFactory = {
    buildCheckbox: buildCheckbox,
    buildHeader: buildHeader,
    createElement: createElement,
    createFragmentFromHTML: createFragmentFromHTML,
    createPaginator: createPaginator,
    escapeHTML: escapeHTML,
    formatCurrency: formatCurrency,
    formatDate: formatDate,
    formatDateTime: formatDateTime,
    readDataset: readDataset,
    buildDatasetLinks: buildDatasetLinks,
    textOrEmpty: textOrEmpty
  };
}());
