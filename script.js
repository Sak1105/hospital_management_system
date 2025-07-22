// PATIENT MANAGEMENT
document.addEventListener("DOMContentLoaded", function () {
  const patientForm = document.getElementById("patientForm");
  const patientTable = document.getElementById("patientTableBody");
  const searchPatient = document.getElementById("searchPatient");

  let patients = JSON.parse(localStorage.getItem("patients")) || [];

  function renderPatients(data = patients) {
    patientTable.innerHTML = "";
    data.forEach((patient, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${patient.name}</td>
        <td>${patient.age}</td>
        <td>${patient.disease}</td>
        <td><button onclick="deletePatient(${index})">Delete</button></td>
      `;
      patientTable.appendChild(row);
    });
  }

  patientForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("pname").value;
    const age = document.getElementById("page").value;
    const disease = document.getElementById("pdisease").value;

    const newPatient = { name, age, disease };
    patients.push(newPatient);
    localStorage.setItem("patients", JSON.stringify(patients));
    renderPatients();
    patientForm.reset();
  });

  window.deletePatient = function (index) {
    patients.splice(index, 1);
    localStorage.setItem("patients", JSON.stringify(patients));
    renderPatients();
  };

  searchPatient.addEventListener("input", function () {
    const searchTerm = searchPatient.value.toLowerCase();
    const filtered = patients.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.disease.toLowerCase().includes(searchTerm)
    );
    renderPatients(filtered);
  });

  // Initial render
  renderPatients();
});


// ----------- DOCTOR MANAGEMENT -----------
document.addEventListener("DOMContentLoaded", function () {
  const doctorForm = document.getElementById("doctorForm");
  const doctorTable = document.getElementById("doctorTableBody");
  const searchDoctor = document.getElementById("searchDoctor");

  if (doctorForm) {
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

    function renderDoctors(data = doctors) {
      doctorTable.innerHTML = "";
      data.forEach((doc, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${doc.name}</td>
          <td>${doc.department}</td>
          <td>${doc.contact}</td>
          <td><button onclick="deleteDoctor(${index})">Delete</button></td>
        `;
        doctorTable.appendChild(row);
      });
    }

    doctorForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("dname").value;
      const department = document.getElementById("ddept").value;
      const contact = document.getElementById("dcontact").value;

      const newDoctor = { name, department, contact };
      doctors.push(newDoctor);
      localStorage.setItem("doctors", JSON.stringify(doctors));
      renderDoctors();
      doctorForm.reset();
    });

    window.deleteDoctor = function (index) {
      doctors.splice(index, 1);
      localStorage.setItem("doctors", JSON.stringify(doctors));
      renderDoctors();
    };

    searchDoctor.addEventListener("input", function () {
      const searchTerm = searchDoctor.value.toLowerCase();
      const filtered = doctors.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm) ||
        doc.department.toLowerCase().includes(searchTerm)
      );
      renderDoctors(filtered);
    });

    renderDoctors();
  }
});


// ----------- APPOINTMENT MANAGEMENT -----------
document.addEventListener("DOMContentLoaded", function () {
  const apptForm = document.getElementById("appointmentForm");
  const apptTable = document.getElementById("appointmentTableBody");
  const searchAppointment = document.getElementById("searchAppointment");
  const patientSelect = document.getElementById("patientSelect");
  const doctorSelect = document.getElementById("doctorSelect");

  if (apptForm) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

    // Populate dropdowns
    patients.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.name;
      opt.textContent = p.name;
      patientSelect.appendChild(opt);
    });

    doctors.forEach(d => {
      const opt = document.createElement("option");
      opt.value = d.name;
      opt.textContent = d.name;
      doctorSelect.appendChild(opt);
    });

    function renderAppointments(data = appointments) {
      apptTable.innerHTML = "";
      data.forEach((appt, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${appt.patient}</td>
          <td>${appt.doctor}</td>
          <td>${new Date(appt.datetime).toLocaleString()}</td>
          <td><button onclick="deleteAppointment(${index})">Delete</button></td>
        `;
        apptTable.appendChild(row);
      });
    }

    apptForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const patient = patientSelect.value;
      const doctor = doctorSelect.value;
      const datetime = document.getElementById("apptDate").value;

      const newAppointment = { patient, doctor, datetime };
      appointments.push(newAppointment);
      localStorage.setItem("appointments", JSON.stringify(appointments));
      renderAppointments();
      apptForm.reset();
    });

    window.deleteAppointment = function (index) {
      appointments.splice(index, 1);
      localStorage.setItem("appointments", JSON.stringify(appointments));
      renderAppointments();
    };

    searchAppointment.addEventListener("input", function () {
      const term = searchAppointment.value.toLowerCase();
      const filtered = appointments.filter(a =>
        a.patient.toLowerCase().includes(term) ||
        a.doctor.toLowerCase().includes(term)
      );
      renderAppointments(filtered);
    });

    renderAppointments();
  }
});
