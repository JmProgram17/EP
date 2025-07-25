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

// Attendance management page
const AsistenciaPage = () => {
  // Mock data for demonstration
  const mockAprendices = [
    { id: 1, nombre: 'Ana García Pérez', documento: '1234567890', estado: 'presente' },
    { id: 2, nombre: 'Carlos Rodríguez López', documento: '0987654321', estado: 'ausente' },
    { id: 3, nombre: 'María Fernández Silva', documento: '1122334455', estado: 'presente' },
    { id: 4, nombre: 'Juan Pablo Morales', documento: '5544332211', estado: 'tardanza' },
    { id: 5, nombre: 'Sofía Hernández Cruz', documento: '9988776655', estado: 'presente' }
  ];

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'presente': return 'bg-green-100 text-green-800';
      case 'ausente': return 'bg-red-100 text-red-800';
      case 'tardanza': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Toma de Asistencia</h2>
          <p className="text-gray-600">Registra la asistencia de los aprendices por clase</p>
        </div>
        
        {/* Control panel for class selection */}
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>Ficha 2558934</option>
            <option>Ficha 2559876</option>
            <option>Ficha 2560123</option>
          </select>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Guardar Asistencia
          </button>
        </div>
      </div>

      {/* Class info card */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Calendar size={20} className="text-gray-500" />
            <div>
              <p className="font-medium text-gray-900">Desarrollo de Software - Trimestre 3</p>
              <p className="text-sm text-gray-600">Fecha: 24 de Julio, 2025 - Hora: 08:00 AM</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Aprendices</p>
            <p className="text-2xl font-bold text-gray-900">{mockAprendices.length}</p>
          </div>
        </div>
      </div>

      {/* Attendance table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Lista de Aprendices</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aprendiz
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockAprendices.map((aprendiz) => (
                <tr key={aprendiz.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{aprendiz.nombre}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{aprendiz.documento}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(aprendiz.estado)}`}>
                      {aprendiz.estado.charAt(0).toUpperCase() + aprendiz.estado.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <select 
                      defaultValue={aprendiz.estado}
                      className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="presente">Presente</option>
                      <option value="ausente">Ausente</option>
                      <option value="tardanza">Tardanza</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
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