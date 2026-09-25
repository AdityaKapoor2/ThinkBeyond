document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements - Screens
  const roleSelectionScreen = document.getElementById('role-selection-screen');
  const schoolRoleScreen = document.getElementById('school-role-screen');
  const teacherDashboard = document.getElementById('teacher-dashboard-screen');
  const studentDashboard = document.getElementById('student-dashboard-screen');
  const landingPage = document.getElementById('landing-page');
  const splashScreen = document.getElementById('splash-screen');
  const ambientCanvas = document.getElementById('ambient-canvas');

  // DOM Elements - Buttons
  const btnRoleIndividual = document.getElementById('btn-role-individual');
  const btnRoleSchool = document.getElementById('btn-role-school');
  const btnRoleTeacher = document.getElementById('btn-role-teacher');
  const btnRoleStudent = document.getElementById('btn-role-student');
  const btnBackToMainRole = document.getElementById('btn-back-to-main-role');
  const btnTeacherLogout = document.getElementById('btn-teacher-logout');
  const btnStudentLogout = document.getElementById('btn-student-logout');
  const btnStudentEnterBharatam = document.getElementById('btn-student-enter-bharatam');
  const btnTeacherBack = document.getElementById('btn-teacher-back');
  const btnStudentBack = document.getElementById('btn-student-back');

  // DOM Elements - Data display
  const teacherStudentsList = document.getElementById('teacher-students-list');
  const studentProgressFill = document.getElementById('student-progress-fill');
  const studentProgressText = document.getElementById('student-progress-text');
  const studentAssignedList = document.getElementById('student-assigned-list');
  const studentCurrentJourney = document.getElementById('student-current-journey');
  const studentRecommended = document.getElementById('student-recommended');
  const assignActivityForm = document.getElementById('assign-activity-form');

  // Helper function to hide all school/auth screens
  function hideAllScreens() {
    roleSelectionScreen.classList.remove('active');
    schoolRoleScreen.classList.remove('active');
    teacherDashboard.classList.remove('active');
    studentDashboard.classList.remove('active');
    
    // Add small delay for fade
    setTimeout(() => {
      roleSelectionScreen.style.display = 'none';
      schoolRoleScreen.style.display = 'none';
      teacherDashboard.style.display = 'none';
      studentDashboard.style.display = 'none';
    }, 800);
  }

  // Show a specific screen
  function showScreen(screenEl) {
    screenEl.style.display = 'flex';
    // small timeout to allow display:flex to apply before opacity transition
    setTimeout(() => {
      screenEl.classList.add('active');
    }, 50);
  }

  // EVENT LISTENERS

  // 1. INDIVIDUAL: Transition to existing Bharatam landing page
  btnRoleIndividual.addEventListener('click', () => {
    hideAllScreens();
    setTimeout(() => {
      landingPage.classList.add('active');
      // Dispatch custom event to let main script.js know to start ambient canvas if needed
      document.dispatchEvent(new CustomEvent('start-bharatam-individual'));
    }, 800);
  });

  // 2. SCHOOL: Show Teacher/Student selection
  btnRoleSchool.addEventListener('click', () => {
    roleSelectionScreen.classList.remove('active');
    setTimeout(() => {
      roleSelectionScreen.style.display = 'none';
      showScreen(schoolRoleScreen);
    }, 800);
  });

  // Back button on Teacher/Student screen
  btnBackToMainRole.addEventListener('click', () => {
    schoolRoleScreen.classList.remove('active');
    setTimeout(() => {
      schoolRoleScreen.style.display = 'none';
      showScreen(roleSelectionScreen);
    }, 800);
  });

  // 3. TEACHER DASHBOARD
  btnRoleTeacher.addEventListener('click', () => {
    schoolRoleScreen.classList.remove('active');
    populateTeacherDashboard();
    setTimeout(() => {
      schoolRoleScreen.style.display = 'none';
      showScreen(teacherDashboard);
    }, 800);
  });

  // 4. STUDENT DASHBOARD
  btnRoleStudent.addEventListener('click', () => {
    schoolRoleScreen.classList.remove('active');
    populateStudentDashboard();
    setTimeout(() => {
      schoolRoleScreen.style.display = 'none';
      showScreen(studentDashboard);
    }, 800);
  });

  // LOGOUT (Return to main role selection)
  btnTeacherLogout.addEventListener('click', () => {
    teacherDashboard.classList.remove('active');
    setTimeout(() => {
      teacherDashboard.style.display = 'none';
      showScreen(roleSelectionScreen);
    }, 800);
  });

  btnStudentLogout.addEventListener('click', () => {
    studentDashboard.classList.remove('active');
    setTimeout(() => {
      studentDashboard.style.display = 'none';
      showScreen(roleSelectionScreen);
    }, 800);
  });

  if (btnTeacherBack) {
    btnTeacherBack.addEventListener('click', () => {
      teacherDashboard.classList.remove('active');
      setTimeout(() => {
        teacherDashboard.style.display = 'none';
        showScreen(schoolRoleScreen);
      }, 800);
    });
  }

  if (btnStudentBack) {
    btnStudentBack.addEventListener('click', () => {
      studentDashboard.classList.remove('active');
      setTimeout(() => {
        studentDashboard.style.display = 'none';
        showScreen(schoolRoleScreen);
      }, 800);
    });
  }

  // STUDENT -> ENTER BHARATAM
  btnStudentEnterBharatam.addEventListener('click', () => {
    hideAllScreens();
    setTimeout(() => {
      landingPage.classList.add('active');
      document.dispatchEvent(new CustomEvent('start-bharatam-individual'));
    }, 800);
  });

  // Assign form prevent default
  if (assignActivityForm) {
    assignActivityForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Activity Assigned successfully!");
    });
  }


  // MOCK DATA POPULATION FUNCTIONS

  function populateTeacherDashboard() {
    if (!teacherStudentsList) return;
    teacherStudentsList.innerHTML = '';
    
    // MOCK_STUDENTS comes from mock-data.js
    if (typeof MOCK_STUDENTS !== 'undefined') {
      MOCK_STUDENTS.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${student.name}</strong></td>
          <td>${student.grade}</td>
          <td>
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="flex:1; background:rgba(0,0,0,0.5); height:8px; border-radius:4px;">
                <div style="width:${student.progress}%; background:#E2B158; height:100%; border-radius:4px;"></div>
              </div>
              <span style="font-size:0.85rem">${student.progress}%</span>
            </div>
          </td>
          <td>${student.currentJourney}</td>
          <td style="color:#A3A3A3">${student.recommended}</td>
        `;
        teacherStudentsList.appendChild(tr);
      });
    }
  }

  function populateStudentDashboard() {
    if (typeof MOCK_CURRENT_STUDENT === 'undefined' || typeof MOCK_ASSIGNED_WORK === 'undefined') return;
    
    // Animate progress bar
    setTimeout(() => {
      if(studentProgressFill) studentProgressFill.style.width = MOCK_CURRENT_STUDENT.progress + '%';
      if(studentProgressText) studentProgressText.innerText = MOCK_CURRENT_STUDENT.progress + '%';
    }, 900); // Trigger after dashboard is visible
    
    if(studentCurrentJourney) studentCurrentJourney.innerText = MOCK_CURRENT_STUDENT.currentJourney;
    if(studentRecommended) studentRecommended.innerText = `Recommended Next: ${MOCK_CURRENT_STUDENT.recommended}`;

    if(studentAssignedList) {
      studentAssignedList.innerHTML = '';
      MOCK_ASSIGNED_WORK.forEach(work => {
        const li = document.createElement('li');
        li.innerHTML = `
          <h4>${work.title}</h4>
          <p>Assigned by ${work.assignedBy} • Due: ${work.dueDate}</p>
        `;
        studentAssignedList.appendChild(li);
      });
    }
  }

});
