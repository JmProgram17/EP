import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  ClipboardCheck, 
  Settings, 
  Menu, 
  X, 
  User,
  Calendar,
  BookOpen,
  Award
} from 'lucide-react';

// Layout component that provides the overall structure
const AppLayout = ({ children, currentView, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation items configuration - makes it easy to add new sections
  const navigationItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'asistencia', label: 'Asistencia', icon: Users },
    { id: 'evaluacion', label: 'Juicios Evaluativos', icon: ClipboardCheck },
    { id: 'configuracion', label: 'Configuración', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar - Fixed header with branding and user info */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
            
            {/* Logo and system title */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <BookOpen size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">SEVAL ASISTE</h1>
            </div>
          </div>

          {/* User avatar and info */}
          <div className="flex items-center space-x-3">
            <span className="hidden sm:block text-sm text-gray-600">Instructor</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={16} className="text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar - Navigation menu */}
      <aside className={`
        fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 z-20 transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-4">
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setSidebarOpen(false); // Close mobile menu after selection
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors
                    ${isActive 
                      ? 'bg-green-100 text-green-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

// Home page component - Dashboard overview
const HomePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Bienvenido a SEVAL ASISTE
        </h2>
        <p className="text-gray-600">
          Sistema de gestión de asistencia y evaluación por competencias para el SENA
        </p>
      </div>

      {/* Dashboard cards showing system overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Fichas Activas</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aprendices Registrados</p>
              <p className="text-2xl font-bold text-gray-900">284</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Evaluaciones Pendientes</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Award size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent activities section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Actividades Recientes</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              'Asistencia registrada para Ficha 2558934',
              'Juicio evaluativo completado - Competencia 280201045',
              'Nueva ficha registrada: Desarrollo de Software 2559876'
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock data - Esta sería eventualmente tu API/base de datos
const MOCK_DATA = {
  instructor: {
    id: "pepito123",
    nombre: "José Pérez",
    materias: ["Python", "Algoritmos", "Bases de Datos"]
  },
  
  fichas: [
    {
      id: "2826505",
      nombre: "Tecnólogo en Análisis y Desarrollo de Software",
      trimestre: 3,
      jornada: "Diurna",
      aprendices: [
        { id: 1, nombre: 'Ana García Pérez', documento: '1234567890' },
        { id: 2, nombre: 'Carlos Rodríguez López', documento: '0987654321' },
        { id: 3, nombre: 'María Fernández Silva', documento: '1122334455' },
        { id: 4, nombre: 'Juan Pablo Morales', documento: '5544332211' },
        { id: 5, nombre: 'Sofía Hernández Cruz', documento: '9988776655' },
        { id: 6, nombre: 'Diego Martínez Rojas', documento: '7788996644' },
        { id: 7, nombre: 'Camila Torres Vega', documento: '3322114455' }
      ],
      horario: {
        lunes: { materia: "Python", instructor: "pepito123", hora: "08:00-12:00" },
        martes: { materia: "Node.js", instructor: "maria456", hora: "08:00-12:00" },
        miercoles: { materia: "Java", instructor: "carlos789", hora: "08:00-12:00" },
        jueves: { materia: "Algoritmos", instructor: "pepito123", hora: "08:00-12:00" },
        viernes: { materia: "Bases de Datos", instructor: "pepito123", hora: "14:00-18:00" }
      }
    },
    {
      id: "2827890",
      nombre: "Tecnólogo en Gestión de Redes",
      trimestre: 2,
      jornada: "Nocturna",
      aprendices: [
        { id: 8, nombre: 'Andrea López Méndez', documento: '9876543210' },
        { id: 9, nombre: 'Felipe Castillo Ruiz', documento: '5566778899' }
      ],
      horario: {
        lunes: { materia: "Redes I", instructor: "laura999", hora: "18:00-22:00" },
        miercoles: { materia: "Algoritmos", instructor: "pepito123", hora: "18:00-22:00" },
        viernes: { materia: "Sistemas Operativos", instructor: "pedro111", hora: "18:00-22:00" }
      }
    }
  ]
};

// Función para obtener las clases del instructor actual
const getInstructorClasses = (instructorId) => {
  const today = new Date();
  const dayNames = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const currentDay = dayNames[today.getDay()];
  
  const instructorClasses = [];
  
  MOCK_DATA.fichas.forEach(ficha => {
    Object.entries(ficha.horario).forEach(([dia, info]) => {
      if (info.instructor === instructorId) {
        instructorClasses.push({
          id: `${ficha.id}-${dia}`,
          fichaId: ficha.id,
          fichaNombre: ficha.nombre,
          materia: info.materia,
          dia: dia,
          hora: info.hora,
          isToday: dia === currentDay,
          totalAprendices: ficha.aprendices.length,
          aprendices: ficha.aprendices
        });
      }
    });
  });
  
  return instructorClasses;
};

// Estados de asistencia con colores
const ATTENDANCE_STATES = {
  presente: { label: 'Presente', color: 'bg-green-100 text-green-800', icon: '✅' },
  ausente: { label: 'Ausente', color: 'bg-red-100 text-red-800', icon: '❌' },
  tardanza: { label: 'Tardanza', color: 'bg-yellow-100 text-yellow-800', icon: '⚠️' },
  ausencia_justificada: { label: 'Justificada', color: 'bg-blue-100 text-blue-800', icon: '📋' },
  salida_temprana: { label: 'Salida Temprana', color: 'bg-purple-100 text-purple-800', icon: '🚪' }
};

// Dashboard principal del instructor
const InstructorDashboard = ({ onSelectClass, instructorId = "pepito123" }) => {
  const instructorClasses = getInstructorClasses(instructorId);
  const todayClasses = instructorClasses.filter(cls => cls.isToday);
  const weekClasses = instructorClasses.filter(cls => !cls.isToday);
  
  const today = new Date().toLocaleDateString('es-CO', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Dashboard del Instructor
        </h2>
        <p className="text-gray-600">
          Gestiona la asistencia de tus clases - {today}
        </p>
      </div>

      {/* Clases de hoy */}
      {todayClasses.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar size={20} className="mr-2 text-green-600" />
            Mis Clases de Hoy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todayClasses.map((clase) => (
              <div key={clase.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="font-medium text-gray-900">{clase.hora}</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{clase.materia}</h4>
                    <p className="text-sm text-gray-600 mb-1">Ficha {clase.fichaId}</p>
                    <p className="text-sm text-gray-500">{clase.totalAprendices} estudiantes</p>
                  </div>
                  <BookOpen size={24} className="text-green-600" />
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    onClick={() => onSelectClass(clase, 'take-attendance')}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Tomar Asistencia
                  </button>
                  <button 
                    onClick={() => onSelectClass(clase, 'view-history')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
                  >
                    Ver Histórico
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Próximas clases de la semana */}
      {weekClasses.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar size={20} className="mr-2 text-blue-600" />
            Próximas Clases de la Semana
          </h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="divide-y divide-gray-200">
              {weekClasses.map((clase) => (
                <div key={clase.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{clase.materia}</h4>
                        <p className="text-sm text-gray-600">
                          {clase.dia.charAt(0).toUpperCase() + clase.dia.slice(1)} • {clase.hora} • Ficha {clase.fichaId}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{clase.totalAprendices} estudiantes</span>
                      <button 
                        onClick={() => onSelectClass(clase, 'view-history')}
                        className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors"
                      >
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Si no hay clases */}
      {todayClasses.length === 0 && weekClasses.length === 0 && (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
          <Calendar size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay clases programadas</h3>
          <p className="text-gray-600">No tienes clases asignadas para esta semana.</p>
        </div>
      )}
    </div>
  );
};

// Componente para tomar asistencia
const TakeAttendance = ({ selectedClass, onBack, onSave }) => {
  const [attendance, setAttendance] = useState(() => {
    // Inicializar todos como presentes por defecto
    const initial = {};
    selectedClass.aprendices.forEach(student => {
      initial[student.id] = 'presente';
    });
    return initial;
  });

  const [comments, setComments] = useState({});

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleCommentChange = (studentId, comment) => {
    setComments(prev => ({
      ...prev,
      [studentId]: comment
    }));
  };

  const handleMarkAllPresent = () => {
    const newAttendance = {};
    selectedClass.aprendices.forEach(student => {
      newAttendance[student.id] = 'presente';
    });
    setAttendance(newAttendance);
  };

  const handleSave = () => {
    const attendanceData = {
      classId: selectedClass.id,
      date: new Date().toISOString().split('T')[0],
      attendance: attendance,
      comments: comments
    };
    onSave(attendanceData);
  };

  const currentDate = new Date().toLocaleDateString('es-CO', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Volver al Dashboard
        </button>
      </div>

      {/* Class info */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen size={24} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{selectedClass.materia}</h2>
              <p className="text-gray-600">Ficha {selectedClass.fichaId} • {currentDate}</p>
              <p className="text-sm text-gray-500">{selectedClass.hora}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Estudiantes</p>
            <p className="text-2xl font-bold text-gray-900">{selectedClass.aprendices.length}</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={handleMarkAllPresent}
          className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
        >
          Marcar Todos Presentes
        </button>
        <button 
          onClick={handleSave}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
        >
          Guardar Asistencia
        </button>
      </div>

      {/* Attendance list */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Lista de Estudiantes</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {selectedClass.aprendices.map((student) => (
            <div key={student.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <User size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{student.nombre}</h4>
                    <p className="text-sm text-gray-600">Doc: {student.documento}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">
                    {ATTENDANCE_STATES[attendance[student.id]]?.icon}
                  </span>
                  <select
                    value={attendance[student.id]}
                    onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {Object.entries(ATTENDANCE_STATES).map(([key, state]) => (
                      <option key={key} value={key}>{state.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Comment input */}
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Comentario u observación (opcional)"
                  value={comments[student.id] || ''}
                  onChange={(e) => handleCommentChange(student.id, e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente principal de asistencia con navegación
const AsistenciaPage = () => {
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, take-attendance, view-history
  const [selectedClass, setSelectedClass] = useState(null);

  const handleSelectClass = (classData, action) => {
    setSelectedClass(classData);
    setCurrentView(action === 'take-attendance' ? 'take-attendance' : 'view-history');
  };

  const handleBack = () => {
    setCurrentView('dashboard');
    setSelectedClass(null);
  };

  const handleSaveAttendance = (attendanceData) => {
    // Aquí se guardaría la asistencia en la base de datos
    console.log('Guardando asistencia:', attendanceData);
    
    // Mostrar confirmación (en un proyecto real usarías una librería de notificaciones)
    alert('¡Asistencia guardada exitosamente!');
    
    // Volver al dashboard
    handleBack();
  };

  // Renderizar la vista actual
  switch (currentView) {
    case 'take-attendance':
      return (
        <TakeAttendance 
          selectedClass={selectedClass}
          onBack={handleBack}
          onSave={handleSaveAttendance}
        />
      );
    case 'view-history':
      return (
        <div className="space-y-6">
          <button 
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Volver al Dashboard
          </button>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
            <Calendar size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Histórico de Asistencia</h3>
            <p className="text-gray-600">Esta funcionalidad se implementará en la siguiente fase</p>
          </div>
        </div>
      );
    default:
      return (
        <InstructorDashboard 
          onSelectClass={handleSelectClass}
          instructorId="pepito123"
        />
      );
  }
};

// Evaluation management page
const EvaluacionPage = () => {
  // Mock competencies data
  const mockCompetencias = [
    {
      id: 1,
      codigo: '280201045',
      nombre: 'Desarrollar el sistema que cumpla con los requisitos de la solución',
      trimestre: 3,
      aprendicesEvaluados: 15,
      totalAprendices: 25
    },
    {
      id: 2,
      codigo: '280201046',
      nombre: 'Realizar mantenimiento de software',
      trimestre: 3,
      aprendicesEvaluados: 8,
      totalAprendices: 25
    },
    {
      id: 3,
      codigo: '280201047',
      nombre: 'Implementar seguridad en las aplicaciones',
      trimestre: 2,
      aprendicesEvaluados: 25,
      totalAprendices: 25
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Juicios Evaluativos</h2>
          <p className="text-gray-600">Gestiona las evaluaciones por competencias</p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>Trimestre 3</option>
            <option>Trimestre 2</option>
            <option>Trimestre 1</option>
          </select>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Nueva Evaluación
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Competencias Activas</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <ClipboardCheck size={24} className="text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Evaluaciones Completadas</p>
              <p className="text-2xl font-bold text-green-600">48</p>
            </div>
            <Award size={24} className="text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-600">27</p>
            </div>
            <Calendar size={24} className="text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Competencies grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockCompetencias.map((competencia) => {
          const progreso = (competencia.aprendicesEvaluados / competencia.totalAprendices) * 100;
          
          return (
            <div key={competencia.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="space-y-4">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">
                        Código: {competencia.codigo}
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mt-1">
                        {competencia.nombre}
                      </h3>
                    </div>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      T{competencia.trimestre}
                    </span>
                  </div>
                </div>

                {/* Progress section */}
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progreso de Evaluación</span>
                    <span>{competencia.aprendicesEvaluados}/{competencia.totalAprendices}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progreso}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{Math.round(progreso)}% completado</p>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-3 pt-2">
                  <button className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    Evaluar Aprendices
                  </button>
                  <button className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Configuration page placeholder
const ConfiguracionPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Configuración</h2>
        <p className="text-gray-600">Ajustes generales del sistema</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
        <Settings size={48} className="text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Configuración del Sistema</h3>
        <p className="text-gray-600">Esta sección estará disponible en versiones futuras</p>
      </div>
    </div>
  );
};

// Main App component that manages navigation and routing
const App = () => {
  const [currentView, setCurrentView] = useState('inicio');

  // Simple routing logic - in a real app, you'd use React Router
  const renderCurrentView = () => {
    switch (currentView) {
      case 'inicio':
        return <HomePage />;
      case 'asistencia':
        return <AsistenciaPage />;
      case 'evaluacion':
        return <EvaluacionPage />;
      case 'configuracion':
        return <ConfiguracionPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AppLayout currentView={currentView} onNavigate={setCurrentView}>
      {renderCurrentView()}
    </AppLayout>
  );
};

export default App;