const PROGRESS_DATASETS = {
  sample: {
    datasetLabel: "Sample PDF data",
    worker: {
      name: "Madeleine Willson",
      appId: "712041"
    },
    claim: {
      number: "20042047",
      badge: "WP"
    },
    submission: {
      submittedAt: "2024-03-19T19:21:00"
    },
    returnToWork: {
      status: "returned",
      returnedDate: "2024-03-15",
      workStatus: "modified-reduced",
      otherWorkStatus: "",
      progressNotes: "Terrible. Testing Testing",
      expectedReturnDate: "",
      concerns: "",
      recentContactName: "",
      recentContactDate: ""
    },
    recovery: {
      status: "recovered",
      comments: "",
      painScore: null,
      treatmentStatus: null,
      providerType: "",
      lastTreatmentDate: "",
      lastTreatmentProvider: "",
      nextTreatmentDate: "",
      nextTreatmentProvider: "",
      therapyFrequency: "",
      medicationStatus: null,
      medicationName: "",
      exercisesStatus: null,
      exercisesList: "",
      additionalInformation: "No info Testing Testing"
    },
    acknowledgements: {
      certificationAccepted: true,
      privacyAccepted: true
    }
  },
  "ongoing-recovery": {
    datasetLabel: "Ongoing recovery scenario",
    worker: {
      name: "Alicia Bowman",
      appId: "901544"
    },
    claim: {
      number: "20059831",
      badge: "WP"
    },
    submission: {
      submittedAt: "2024-07-18T14:42:00"
    },
    returnToWork: {
      status: "not-returned",
      returnedDate: "",
      workStatus: "other",
      otherWorkStatus: "Graduated transitional duties discussed with employer but not yet approved.",
      progressNotes: "Pain is improving, but repetitive reaching still causes flare-ups by the end of the day.",
      expectedReturnDate: "2024-08-05",
      concerns: "I am concerned about the pace of returning to overhead work before my physiotherapist clears full range of motion.",
      recentContactName: "Shelley Morris",
      recentContactDate: "2024-07-17"
    },
    recovery: {
      status: "not-recovered",
      comments: "Strength is improving slowly. Sleep is better, but I still wake up with stiffness in my shoulder several times a week.",
      painScore: 7,
      treatmentStatus: "continuing",
      providerType: "Physiotherapist",
      lastTreatmentDate: "2024-07-15",
      lastTreatmentProvider: "Prairie Sports Medicine",
      nextTreatmentDate: "2024-07-22",
      nextTreatmentProvider: "Prairie Sports Medicine",
      therapyFrequency: "Twice weekly",
      medicationStatus: "taking",
      medicationName: "Naproxen 500 mg as needed",
      exercisesStatus: "doing",
      exercisesList: "Wall slides, banded external rotations, and pendulum swings twice daily.",
      additionalInformation: "Employer remains supportive and is waiting for updated restrictions before scheduling modified shifts."
    },
    acknowledgements: {
      certificationAccepted: true,
      privacyAccepted: true
    }
  },
  minimal: {
    datasetLabel: "Minimal and blank-state coverage",
    worker: {
      name: "Noah Patel",
      appId: "775410"
    },
    claim: {
      number: "20067751",
      badge: "WP"
    },
    submission: {
      submittedAt: "2024-08-06T09:18:00"
    },
    returnToWork: {
      status: "not-missed",
      returnedDate: "",
      workStatus: "full-regular",
      otherWorkStatus: "",
      progressNotes: "",
      expectedReturnDate: "",
      concerns: "",
      recentContactName: "",
      recentContactDate: ""
    },
    recovery: {
      status: "recovered",
      comments: "",
      painScore: 2,
      treatmentStatus: "none",
      providerType: "",
      lastTreatmentDate: "2024-08-01",
      lastTreatmentProvider: "River East Walk-In",
      nextTreatmentDate: "",
      nextTreatmentProvider: "",
      therapyFrequency: "",
      medicationStatus: "none",
      medicationName: "",
      exercisesStatus: "none",
      exercisesList: "",
      additionalInformation: ""
    },
    acknowledgements: {
      certificationAccepted: true,
      privacyAccepted: true
    }
  }
};

const PROGRESS_DATASET_LINKS = [
  { key: "sample", label: "Sample PDF data" },
  { key: "ongoing-recovery", label: "Ongoing recovery" },
  { key: "minimal", label: "Minimal dataset" }
];

const PROGRESS_CONTACT = {
  addressLine1: "333 Broadway",
  addressLine2: "Winnipeg, MB R3C 4W3",
  phone: "(204) 954-4321",
  tollFree: "1-855-954-4321",
  website: "wcb.mb.ca"
};

document.addEventListener("DOMContentLoaded", function () {
  const selected = DocumentFactory.readDataset(PROGRESS_DATASETS, "sample");
  document.querySelector("[data-dataset-name]").textContent = selected.value.datasetLabel;
  DocumentFactory.buildDatasetLinks(document, "./index.html", selected.key, PROGRESS_DATASET_LINKS);
  renderProgressDocument(selected.value);
});

function renderProgressDocument(data) {
  const pagesRoot = document.getElementById("pages");
  pagesRoot.innerHTML = "";

  const paginator = DocumentFactory.createPaginator({
    root: pagesRoot,
    footer: {
      appId: data.worker.appId,
      submittedAt: data.submission.submittedAt
    }
  });

  buildPageOneBlocks(data).forEach(function (block) {
    paginator.appendNode(block);
  });

  paginator.pageBreak();

  buildPageTwoBlocks(data).forEach(function (block) {
    paginator.appendNode(block);
  });

  paginator.pageBreak();

  buildPageThreeBlocks(data).forEach(function (block) {
    paginator.appendNode(block);
  });

  paginator.finish();
}

function buildPageOneBlocks(data) {
  return [
    buildProgressHeader(data),
    buildProgressIntro(data),
    buildHeading("Return to Work"),
    buildReturnStatusCard(data.returnToWork),
    buildWorkStatusCard(data.returnToWork),
    buildTextBox("My return to work is going:", data.returnToWork.progressNotes, "text-box--medium"),
    buildLabeledDateRow("I expect to return to work on:", data.returnToWork.expectedReturnDate),
    buildTextBox("I have the following concerns about returning to work:", data.returnToWork.concerns, "text-box--concerns"),
    buildRecentContactRow(data.returnToWork),
    buildHeading("Recovery"),
    buildRecoveryStatusCard(data.recovery),
    buildTextBox("I have provided the following comments about my recovery:", data.recovery.comments, "text-box--recovery")
  ];
}

function buildPageTwoBlocks(data) {
  return [
    buildPainScale(data.recovery.painScore),
    buildTreatmentCard(data.recovery),
    buildTwoFieldRow("My last medical treatment was", data.recovery.lastTreatmentDate, "Date", "from", data.recovery.lastTreatmentProvider, "Medical Provider Name"),
    buildTwoFieldRow("My next medical treatment is", data.recovery.nextTreatmentDate, "Date", "from", data.recovery.nextTreatmentProvider, "Medical Provider Name"),
    buildFrequencyRow(data.recovery.therapyFrequency),
    buildMedicationCard(data.recovery),
    buildExercisesCard(data.recovery),
    buildTextBox("List the exercises you are doing:", data.recovery.exercisesList, "text-box--exercise-list"),
    buildHeading("Other Information"),
    buildTextBox("I would like to provide the following additional information about my claim/injury:", data.recovery.additionalInformation, "text-box--medium")
  ];
}

function buildPageThreeBlocks(data) {
  return [
    buildCertificationBlock(data.acknowledgements.certificationAccepted),
    buildPrivacyBlock(data.acknowledgements.privacyAccepted)
  ];
}

function buildProgressHeader(data) {
  return DocumentFactory.buildHeader({
    logoPath: "../assets/wcb-logo.png",
    title: "Worker Progress Report",
    claimNumber: data.claim.number,
    badge: data.claim.badge,
    contact: PROGRESS_CONTACT
  });
}

function buildProgressIntro(data) {
  const intro = DocumentFactory.createElement("p", "intro-copy");
  intro.appendChild(DocumentFactory.createElement("span", "dynamic-text", data.worker.name));
  intro.appendChild(document.createTextNode(" provided the following updates in relation to their claim:"));
  return intro;
}

function buildHeading(text) {
  return DocumentFactory.createElement("h2", "form-section-title", text);
}

function buildReturnStatusCard(returnToWork) {
  const card = createOptionCard();
  card.appendChild(DocumentFactory.createElement("p", "option-card__legend", "Select one:"));

  const grid = DocumentFactory.createElement("div", "option-grid return-status-grid");
  grid.appendChild(createCheckboxOption(returnToWork.status === "not-missed", "I have not missed time from work"));
  grid.appendChild(createCheckboxOption(returnToWork.status === "not-returned", "I have not returned to work"));

  const returned = DocumentFactory.createElement("div", "option-with-field");
  returned.appendChild(createCheckboxOption(returnToWork.status === "returned", "I returned to work on:"));
  returned.appendChild(createLineField(returnToWork.returnedDate, "Date", "line-field--date"));
  grid.appendChild(returned);

  card.appendChild(grid);
  return card;
}

function buildWorkStatusCard(returnToWork) {
  const card = createOptionCard();
  card.appendChild(DocumentFactory.createElement("p", "option-card__legend", "I am working:"));

  const grid = DocumentFactory.createElement("div", "option-grid work-status-grid");
  grid.appendChild(createCheckboxOption(returnToWork.workStatus === "full-regular", "Full duties, regular hours"));
  grid.appendChild(createCheckboxOption(returnToWork.workStatus === "full-reduced", "Full duties, reduced hours"));
  grid.appendChild(createCheckboxOption(returnToWork.workStatus === "modified-regular", "Modified duties, regular hours"));
  grid.appendChild(createCheckboxOption(returnToWork.workStatus === "modified-reduced", "Modified duties, reduced hours"));

  const other = DocumentFactory.createElement("div", "other-row");
  other.appendChild(createCheckboxOption(returnToWork.workStatus === "other", "Other:"));
  other.appendChild(createLineField(returnToWork.otherWorkStatus, "", "line-field--xl"));
  grid.appendChild(other);

  card.appendChild(grid);
  return card;
}

function buildLabeledDateRow(label, value) {
  const row = DocumentFactory.createElement("div", "line-row");
  row.appendChild(DocumentFactory.createElement("div", "line-row__label", label));
  row.appendChild(createLineField(value, "Date", "line-field--date"));
  return row;
}

function buildRecentContactRow(returnToWork) {
  const row = DocumentFactory.createElement("div", "line-row line-row--spread");
  row.appendChild(DocumentFactory.createElement("div", "line-row__label", "I was most recently in contact with:"));
  row.appendChild(createLineField(returnToWork.recentContactName, "Name of employer contact", "line-field--wide"));
  row.appendChild(DocumentFactory.createElement("div", "line-row__label", "on"));
  row.appendChild(createLineField(returnToWork.recentContactDate, "Date", "line-field--date"));
  return row;
}

function buildRecoveryStatusCard(recovery) {
  const card = createOptionCard();
  card.appendChild(DocumentFactory.createElement("p", "option-card__legend", "Select one:"));

  const grid = DocumentFactory.createElement("div", "option-grid recovery-grid");
  grid.appendChild(createCheckboxOption(recovery.status === "not-recovered", "I have not fully recovered from my workplace injury."));
  grid.appendChild(createCheckboxOption(recovery.status === "recovered", "I have fully recovered from my workplace injury."));

  card.appendChild(grid);
  return card;
}

function buildPainScale(score) {
  const section = DocumentFactory.createElement("section", "section-block");
  const layout = DocumentFactory.createElement("div", "pain-scale");
  const prompt = DocumentFactory.createElement("p", "pain-scale__prompt", "I rate my current pain/discomfort on a scale of 1-10, where 1 is no pain and 10 is severe pain out of 10.");
  const grid = DocumentFactory.createElement("div", "pain-scale__grid");

  for (let index = 1; index <= 10; index += 1) {
    const item = DocumentFactory.createElement("div", "pain-scale__item");
    const box = DocumentFactory.createElement("span", "checkbox" + (score === index ? " is-checked" : ""));
    box.setAttribute("aria-hidden", "true");
    item.appendChild(box);
    item.appendChild(DocumentFactory.createElement("span", "", String(index)));
    grid.appendChild(item);
  }

  layout.appendChild(prompt);
  layout.appendChild(grid);
  section.appendChild(layout);
  return section;
}

function buildTreatmentCard(recovery) {
  const card = createOptionCard();
  card.appendChild(DocumentFactory.createElement("p", "option-card__legend", "Select one:"));

  const grid = DocumentFactory.createElement("div", "option-grid treatment-grid");
  grid.appendChild(createCheckboxOption(recovery.treatmentStatus === "none", "I am not continuing to receive medical treatment for my workplace injury."));

  const continuing = DocumentFactory.createElement("div", "option-with-field");
  continuing.appendChild(createCheckboxOption(recovery.treatmentStatus === "continuing", "I am continuing to receive medical treatment for my workplace injury from:"));
  continuing.appendChild(createLineField(recovery.providerType, "Medical Provider Type", "line-field--wide"));
  grid.appendChild(continuing);

  card.appendChild(grid);
  return card;
}

function buildTwoFieldRow(prefix, valueOne, captionOne, connector, valueTwo, captionTwo) {
  const row = DocumentFactory.createElement("div", "line-row");
  row.appendChild(DocumentFactory.createElement("div", "line-row__label", prefix));
  row.appendChild(createLineField(valueOne, captionOne, "line-field--date"));
  row.appendChild(DocumentFactory.createElement("div", "line-row__label", connector));
  row.appendChild(createLineField(valueTwo, captionTwo, "line-field--wide"));
  return row;
}

function buildFrequencyRow(frequency) {
  const row = DocumentFactory.createElement("div", "line-row");
  row.appendChild(DocumentFactory.createElement("div", "line-row__label", "I am attending a Chiropractor or Physiotherapist"));
  row.appendChild(createLineField(frequency, "Frequency", "line-field--wide"));
  return row;
}

function buildMedicationCard(recovery) {
  const card = createOptionCard();
  card.appendChild(DocumentFactory.createElement("p", "option-card__legend", "Select one:"));

  const grid = DocumentFactory.createElement("div", "option-grid medication-grid");
  grid.appendChild(createCheckboxOption(recovery.medicationStatus === "none", "I am not taking medication for my workplace injury."));

  const taking = DocumentFactory.createElement("div", "option-with-field");
  taking.appendChild(createCheckboxOption(recovery.medicationStatus === "taking", "I am taking medication for my workplace injury:"));
  taking.appendChild(createLineField(recovery.medicationName, "Name of prescribed medication", "line-field--wide"));
  grid.appendChild(taking);

  card.appendChild(grid);
  return card;
}

function buildExercisesCard(recovery) {
  const card = createOptionCard();
  card.appendChild(DocumentFactory.createElement("p", "option-card__legend", "Select one:"));

  const grid = DocumentFactory.createElement("div", "option-grid exercise-grid");
  grid.appendChild(createCheckboxOption(recovery.exercisesStatus === "none", "I am not doing home exercises for my workplace injury."));
  grid.appendChild(createCheckboxOption(recovery.exercisesStatus === "doing", "I am doing home exercises for my workplace injury."));

  card.appendChild(grid);
  return card;
}

function buildTextBox(label, value, modifierClass) {
  const box = DocumentFactory.createElement("section", "text-box " + (modifierClass || "text-box--spacious"));
  box.appendChild(DocumentFactory.createElement("p", "text-box__label", label));

  const content = DocumentFactory.createElement("div", "text-box__value");
  content.textContent = value || "";
  box.appendChild(content);
  return box;
}

function buildCertificationBlock(isAccepted) {
  return buildAcknowledgementBlock(
    isAccepted,
    "I certify that the information given on this form is true, correct and complete to the best of my knowledge. I agree to notify the Workers Compensation Board of Manitoba (WCB) immediately once I return to any form of work and/or employment. I understand that it is an offence to knowingly make a false statement to the WCB. I also understand that it is an offence to withhold information from WCB which affects my entitlement to compensation (e.g., full or partial recovery from injury, ability to return to work, sources of additional income, etc.). I understand that refusing to co-operate with, or follow my treatment, may result in the WCB reducing or suspending my benefits."
  );
}

function buildPrivacyBlock(isAccepted) {
  const block = DocumentFactory.createElement("section", "certification");
  const box = DocumentFactory.createElement("span", "checkbox" + (isAccepted ? " is-checked" : ""));
  box.setAttribute("aria-hidden", "true");
  block.appendChild(box);

  const content = DocumentFactory.createElement("div");
  content.appendChild(document.createTextNode("I understand that the "));
  const link = DocumentFactory.createElement("a", "", "Privacy Notice");
  link.href = "#";
  content.appendChild(link);
  content.appendChild(document.createTextNode(" applies to the personal information collected in this document."));
  block.appendChild(content);
  return block;
}

function buildAcknowledgementBlock(isAccepted, text) {
  const block = DocumentFactory.createElement("section", "certification");
  const box = DocumentFactory.createElement("span", "checkbox" + (isAccepted ? " is-checked" : ""));
  box.setAttribute("aria-hidden", "true");
  block.appendChild(box);
  block.appendChild(DocumentFactory.createElement("div", "", text));
  return block;
}

function createOptionCard() {
  return DocumentFactory.createElement("section", "option-card");
}

function createCheckboxOption(isChecked, label) {
  const wrapper = DocumentFactory.createElement("div", "option-item");
  const box = DocumentFactory.createElement("span", "checkbox" + (isChecked ? " is-checked" : ""));
  box.setAttribute("aria-hidden", "true");
  wrapper.appendChild(box);

  const text = DocumentFactory.createElement("div", "option-item__label", label);
  wrapper.appendChild(text);
  return wrapper;
}

function createLineField(value, caption, className) {
  const field = DocumentFactory.createElement("div", "line-field" + (className ? " " + className : ""));
  const lineValue = DocumentFactory.createElement("div", "line-field__value");
  const displayValue = caption === "Date" ? DocumentFactory.formatDate(value) : (value || "");
  lineValue.textContent = displayValue;
  field.appendChild(lineValue);

  if (caption) {
    field.appendChild(DocumentFactory.createElement("div", "line-field__caption", caption));
  }

  return field;
}
