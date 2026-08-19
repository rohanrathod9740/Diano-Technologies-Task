const EXPENSE_DATASETS = {
  sample: {
    datasetLabel: "Sample PDF data",
    worker: {
      name: "Madeleine Willson",
      appId: "712041"
    },
    claim: {
      number: "20042047"
    },
    submission: {
      submittedAt: "2024-03-28T20:43:00"
    },
    sections: {
      prescriptionDrugs: [
        {
          drugName: "Naproxen",
          prescriptionDate: "2024-02-28",
          datePurchased: "2024-02-29",
          providerName: "Dr. Best",
          paidAmount: 20
        }
      ],
      otcDrugs: [
        {
          drugName: "Advil",
          datePurchased: "2024-03-28",
          paidAmount: 8,
          sellerName: "Shoppers Drug Mart",
          reason: "Pain"
        }
      ],
      supplies: [
        {
          itemPurchased: "Tensor",
          datePurchased: "2024-02-28",
          prescribed: "Yes",
          providerName: "Dr. Best",
          paidAmount: 10,
          sellerName: "Shoppers Drug Mart"
        }
      ],
      parking: [
        {
          providerAddress: "333 St Mary Ave, Winnipeg MB R3C 4A5, Canada",
          date: "2024-03-28",
          paidAmount: 10,
          meterUsed: "yes",
          meterNumber: "12245"
        }
      ],
      mileage: [
        {
          appointmentDate: "2024-03-28",
          providerAddress: "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada",
          workplaceAddress: "WCB, 333 Broadway, Winnipeg MB R3C 4W3, Canada",
          roundTripKm: "20 km"
        }
      ],
      busTaxi: [
        {
          appointmentDate: "2024-03-28",
          startPoint: "",
          providerAddress: "HSC Winnipeg Women's Hospital, 665 William Ave, Winnipeg MB R3E 0Z2, Canada",
          rideType: "Bus",
          totalFare: 3
        },
        {
          appointmentDate: "2024-03-27",
          startPoint: "25 Furby St, Winnipeg MB R3C 2A2, Canada",
          providerAddress: "440 Edmonton St, Winnipeg MB R3B 2M4, Canada",
          rideType: "Taxi",
          totalFare: 15
        }
      ]
    },
    acknowledgements: {
      privacyAccepted: true
    }
  },
  extended: {
    datasetLabel: "Extended row coverage",
    worker: {
      name: "Jordan Sinclair",
      appId: "824510"
    },
    claim: {
      number: "20058291"
    },
    submission: {
      submittedAt: "2024-07-09T16:18:00"
    },
    sections: {
      prescriptionDrugs: [
        {
          drugName: "Naproxen",
          prescriptionDate: "2024-06-10",
          datePurchased: "2024-06-10",
          providerName: "Dr. Singh",
          paidAmount: 22
        },
        {
          drugName: "Methocarbamol",
          prescriptionDate: "2024-06-19",
          datePurchased: "2024-06-20",
          providerName: "Dr. Singh",
          paidAmount: 18.55
        },
        {
          drugName: "Pantoprazole",
          prescriptionDate: "2024-06-19",
          datePurchased: "2024-06-20",
          providerName: "Dr. Singh",
          paidAmount: 13.25
        }
      ],
      otcDrugs: [
        {
          drugName: "Advil",
          datePurchased: "2024-06-14",
          paidAmount: 11.49,
          sellerName: "Shoppers Drug Mart",
          reason: "Inflammation"
        },
        {
          drugName: "Ice packs",
          datePurchased: "2024-06-14",
          paidAmount: 7.2,
          sellerName: "Rexall",
          reason: "Pain management at home"
        }
      ],
      supplies: [
        {
          itemPurchased: "Wrist brace",
          datePurchased: "2024-06-11",
          prescribed: "Yes",
          providerName: "Dr. Singh",
          paidAmount: 36.4,
          sellerName: "MediCare Supply"
        },
        {
          itemPurchased: "Compression bandage",
          datePurchased: "2024-06-13",
          prescribed: "No",
          providerName: "",
          paidAmount: 14.89,
          sellerName: "Wal-Mart Pharmacy"
        }
      ],
      parking: [
        {
          providerAddress: "Health Sciences Centre, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada",
          date: "2024-06-18",
          paidAmount: 12,
          meterUsed: "yes",
          meterNumber: "44781"
        },
        {
          providerAddress: "Pan Am Clinic, 75 Poseidon Bay, Winnipeg MB R3M 3E4, Canada",
          date: "2024-06-25",
          paidAmount: 8,
          meterUsed: "no",
          meterNumber: ""
        }
      ],
      mileage: [
        {
          appointmentDate: "2024-06-18",
          providerAddress: "Health Sciences Centre, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada",
          workplaceAddress: "Northern Rail Services, 1650 Dugald Rd, Winnipeg MB R2J 0H3, Canada",
          roundTripKm: "26 km"
        },
        {
          appointmentDate: "2024-06-25",
          providerAddress: "Pan Am Clinic, 75 Poseidon Bay, Winnipeg MB R3M 3E4, Canada",
          workplaceAddress: "Northern Rail Services, 1650 Dugald Rd, Winnipeg MB R2J 0H3, Canada",
          roundTripKm: "19 km"
        },
        {
          appointmentDate: "2024-07-02",
          providerAddress: "Prairie Sports Medicine, 1120 Grant Ave, Winnipeg MB R3M 2A6, Canada",
          workplaceAddress: "Northern Rail Services, 1650 Dugald Rd, Winnipeg MB R2J 0H3, Canada",
          roundTripKm: "21 km"
        }
      ],
      busTaxi: [
        {
          appointmentDate: "2024-06-20",
          startPoint: "681 Sargent Ave, Winnipeg MB R3E 0A8, Canada",
          providerAddress: "HSC Winnipeg Women's Hospital, 665 William Ave, Winnipeg MB R3E 0Z2, Canada",
          rideType: "Bus",
          totalFare: 3.15
        },
        {
          appointmentDate: "2024-06-24",
          startPoint: "681 Sargent Ave, Winnipeg MB R3E 0A8, Canada",
          providerAddress: "Manitoba Clinic, 790 Sherbrook St, Winnipeg MB R3A 1M3, Canada",
          rideType: "Bus",
          totalFare: 3.15
        },
        {
          appointmentDate: "2024-06-28",
          startPoint: "681 Sargent Ave, Winnipeg MB R3E 0A8, Canada",
          providerAddress: "Pan Am Clinic, 75 Poseidon Bay, Winnipeg MB R3M 3E4, Canada",
          rideType: "Taxi",
          totalFare: 21.5
        },
        {
          appointmentDate: "2024-07-03",
          startPoint: "681 Sargent Ave, Winnipeg MB R3E 0A8, Canada",
          providerAddress: "Prairie Sports Medicine, 1120 Grant Ave, Winnipeg MB R3M 2A6, Canada",
          rideType: "Taxi",
          totalFare: 19.75
        }
      ]
    },
    acknowledgements: {
      privacyAccepted: true
    }
  },
  minimal: {
    datasetLabel: "Minimal and empty-state coverage",
    worker: {
      name: "Avery Chen",
      appId: "905331"
    },
    claim: {
      number: "20061284"
    },
    submission: {
      submittedAt: "2024-08-02T09:07:00"
    },
    sections: {
      prescriptionDrugs: [],
      otcDrugs: [
        {
          drugName: "Acetaminophen",
          datePurchased: "2024-07-31",
          paidAmount: 6.75,
          sellerName: "Safeway Pharmacy",
          reason: "Headache after treatment"
        }
      ],
      supplies: [],
      parking: [],
      mileage: [
        {
          appointmentDate: "2024-08-01",
          providerAddress: "River East Physiotherapy, 2360 Main St, Winnipeg MB R2V 4T7, Canada",
          workplaceAddress: "Home office, 47 Hampton St, Winnipeg MB R2L 1V9, Canada",
          roundTripKm: "14 km"
        }
      ],
      busTaxi: []
    },
    acknowledgements: {
      privacyAccepted: false
    }
  }
};

const EXPENSE_DATASET_LINKS = [
  { key: "sample", label: "Sample PDF data" },
  { key: "extended", label: "Extended dataset" },
  { key: "minimal", label: "Minimal dataset" }
];

const EXPENSE_CONTACT = {
  addressLine1: "333 Broadway",
  addressLine2: "Winnipeg, MB R3C 4W3",
  phone: "(204) 954-4321",
  tollFree: "1-855-954-4321",
  website: "wcb.mb.ca"
};

document.addEventListener("DOMContentLoaded", function () {
  const selected = DocumentFactory.readDataset(EXPENSE_DATASETS, "sample");
  const activeData = selected.value;

  document.querySelector("[data-dataset-name]").textContent = activeData.datasetLabel;
  DocumentFactory.buildDatasetLinks(document, "./index.html", selected.key, EXPENSE_DATASET_LINKS);

  renderExpenseDocument(activeData);
});

function renderExpenseDocument(data) {
  const pagesRoot = document.getElementById("pages");
  pagesRoot.innerHTML = "";

  const paginator = DocumentFactory.createPaginator({
    root: pagesRoot,
    footer: {
      appId: data.worker.appId,
      submittedAt: data.submission.submittedAt
    }
  });

  paginator.appendNode(buildExpenseHeader(data));
  paginator.appendNode(buildExpenseIntro(data));

  buildFirstPageSections(data).forEach(function (section) {
    paginator.appendTableSection(section);
  });

  paginator.pageBreak();

  buildSecondPageSections(data).forEach(function (section) {
    paginator.appendTableSection(section);
  });

  paginator.appendNode(buildPrivacyAcknowledgement(data.acknowledgements.privacyAccepted));
  paginator.finish();
}

function buildExpenseHeader(data) {
  return DocumentFactory.buildHeader({
    logoPath: "../assets/wcb-logo.png",
    title: "Medical & Travel Expense Request",
    claimNumber: data.claim.number,
    contact: EXPENSE_CONTACT
  });
}

function buildExpenseIntro(data) {
  const intro = DocumentFactory.createElement("p", "intro-copy");
  intro.appendChild(DocumentFactory.createElement("span", "dynamic-text", data.worker.name));
  intro.appendChild(document.createTextNode(" requested reimbursement for the following medical and/or travel expenses:"));
  return intro;
}

function buildFirstPageSections(data) {
  return [
    {
      title: "Prescription Drugs",
      columns: [
        { label: "Drug Name", width: "19%" },
        { label: "Prescription Date", width: "18%" },
        { label: "Date Purchased", width: "18%" },
        { label: "Healthcare Provider Name", width: "31.5%" },
        { label: "Paid Amount", width: "13.5%" }
      ],
      rows: data.sections.prescriptionDrugs,
      getCells: function (row) {
        return [
          row.drugName,
          DocumentFactory.formatDate(row.prescriptionDate),
          DocumentFactory.formatDate(row.datePurchased),
          row.providerName,
          { text: DocumentFactory.formatCurrency(row.paidAmount), className: "numeric" }
        ];
      }
    },
    {
      title: "Over-the-Counter Drugs",
      columns: [
        { label: "Drug Name", width: "20%" },
        { label: "Date Purchased", width: "16.5%" },
        { label: "Paid Amount", width: "11%" },
        { label: "Seller's Name", width: "23%" },
        { label: "Reason for Purchasing", width: "29.5%" }
      ],
      rows: data.sections.otcDrugs,
      getCells: function (row) {
        return [
          row.drugName,
          DocumentFactory.formatDate(row.datePurchased),
          { text: DocumentFactory.formatCurrency(row.paidAmount), className: "numeric" },
          row.sellerName,
          row.reason
        ];
      }
    },
    {
      title: "Bandages, Braces or Other Medical Supplies",
      columns: [
        { label: "Item Purchased", width: "18.5%" },
        { label: "Date Purchased", width: "11.5%" },
        { label: "Was this Prescribed?", width: "10%" },
        { label: "Healthcare Provider Name", width: "23.5%" },
        { label: "Paid Amount", width: "11%" },
        { label: "Seller's Name", width: "25.5%" }
      ],
      rows: data.sections.supplies,
      getCells: function (row) {
        return [
          row.itemPurchased,
          DocumentFactory.formatDate(row.datePurchased),
          row.prescribed,
          row.providerName,
          { text: DocumentFactory.formatCurrency(row.paidAmount), className: "numeric" },
          row.sellerName
        ];
      }
    },
    {
      title: "Parking for Medical Appointments",
      columns: [
        { label: "Address of Healthcare Provider/Medical Facility", width: "39%" },
        { label: "Date", width: "17%" },
        { label: "Paid Amount", width: "13%" },
        { label: "Meter Used?", width: "12%" },
        { label: "Meter Number", width: "19%" }
      ],
      rows: data.sections.parking,
      getCells: function (row) {
        return [
          row.providerAddress,
          DocumentFactory.formatDate(row.date),
          { text: DocumentFactory.formatCurrency(row.paidAmount), className: "numeric" },
          row.meterUsed,
          row.meterNumber
        ];
      }
    },
    {
      title: "Mileage to Medical Appointments",
      note: "The WCB will generally reimburse only those transportation costs which are in excess of costs that would be incurred by the worker while travelling to and from work.",
      columns: [
        { label: "Appointment Date", width: "15%" },
        { label: "Address of Healthcare Provider/Medical Facility", width: "33.5%" },
        { label: "Address of Workplace", width: "30.5%" },
        { label: "Number of km (Round Trip)", width: "21%" }
      ],
      rows: data.sections.mileage,
      getCells: function (row) {
        return [
          DocumentFactory.formatDate(row.appointmentDate),
          row.providerAddress,
          row.workplaceAddress,
          row.roundTripKm
        ];
      }
    }
  ];
}

function buildSecondPageSections(data) {
  return [
    {
      title: "Bus or Taxi Fare for Medical Appointments*",
      note: "*Note: Pre-approval is required from your WCB representative to claim taxi fare(s).",
      columns: [
        { label: "Appointment Date", width: "14%" },
        { label: "Address of Starting Point", width: "29.5%" },
        { label: "Address of Healthcare Provider/Medical Facility", width: "33.5%" },
        { label: "Bus or Taxi (indicate one)", width: "13%" },
        { label: "Total Fare Paid", width: "10%" }
      ],
      rows: data.sections.busTaxi,
      getCells: function (row) {
        return [
          DocumentFactory.formatDate(row.appointmentDate),
          row.startPoint,
          row.providerAddress,
          row.rideType,
          { text: DocumentFactory.formatCurrency(row.totalFare), className: "numeric" }
        ];
      }
    }
  ];
}

function buildPrivacyAcknowledgement(isAccepted) {
  const row = DocumentFactory.createElement("section", "acknowledgement");
  const box = DocumentFactory.createElement("span", "checkbox" + (isAccepted ? " is-checked" : ""));
  box.setAttribute("aria-hidden", "true");
  row.appendChild(box);

  const copy = DocumentFactory.createElement("div");
  copy.appendChild(document.createTextNode("I understand that the "));

  const link = DocumentFactory.createElement("a", "", "Privacy Notice");
  link.href = "#";
  link.setAttribute("aria-label", "Privacy Notice");
  copy.appendChild(link);

  copy.appendChild(document.createTextNode(" applies to the personal information collected in this document."));
  row.appendChild(copy);
  return row;
}
