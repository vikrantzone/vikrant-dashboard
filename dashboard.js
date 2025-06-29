const students = [
  { name: "Aarav Patil", attendance: 92, marks: 85, behavior: "Good", discipline: "Excellent", remarks: "Participates actively", email: "aarav@example.com" },
  { name: "Sneha Deshmukh", attendance: 88, marks: 79, behavior: "Average", discipline: "Good", remarks: "Needs punctuality", email: "sneha@example.com" }
];

function loadTable(data) {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";
  data.forEach((s, i) => {
    tbody.innerHTML += `
      <tr>
        <td contenteditable="true">${s.name}</td>
        <td contenteditable="true">${s.attendance}</td>
        <td contenteditable="true">${s.marks}</td>
        <td contenteditable="true">${s.behavior}</td>
        <td contenteditable="true">${s.discipline}</td>
        <td contenteditable="true">${s.remarks}</td>
        <td contenteditable="true">${s.email}</td>
        <td class="admin-only"><button onclick="generateReportCard(${i})">PDF</button></td>
      </tr>`;
  });
}

function generateReportCard(i) {
  const { jsPDF } = window.jspdf;
  const s = students[i];
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(`Report Card: ${s.name}`, 20, 20);
  doc.setFontSize(12);
  doc.text(`Attendance: ${s.attendance}%`, 20, 40);
  doc.text(`Marks: ${s.marks}`, 20, 50);
  doc.text(`Behavior: ${s.behavior}`, 20, 60);
  doc.text(`Discipline: ${s.discipline}`, 20, 70);
  doc.text(`Remarks: ${s.remarks}`, 20, 80);
  doc.save(`${s.name.replace(" ", "_")}_ReportCard.pdf`);
}

function applyFilter() {
  const t = parseInt(document.getElementById("filterAttendance").value);
  const f = students.filter(s => s.attendance < t);
  loadTable(f);
}

function resetFilter() {
  loadTable(students);
}

function sortTable(i) {
  students.sort((a, b) => Object.values(a)[i] > Object.values(b)[i] ? 1 : -1);
  loadTable(students);
}

function downloadAllPDFs() {
  students.forEach((_, i) => setTimeout(() => generateReportCard(i), i * 500));
}

function generateChart() {
  new Chart(document.getElementById("performanceChart").getContext("2d"), {
    type: 'bar',
    data: {
      labels: students.map(s => s.name),
      datasets: [
        { label: "Marks", data: students.map(s => s.marks), backgroundColor: "#3498db" },
        { label: "Attendance", data: students.map(s => s.attendance), backgroundColor: "#2ecc71" }
      ]
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadTable(students);
  generateChart();
});
