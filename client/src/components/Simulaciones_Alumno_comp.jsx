// BACKEND: Componente de Simulaciones del Alumno
// Este componente maneja la página de simulaciones del estudiante con 3 niveles:
// 1. Tarjetas de simuladores (áreas generales vs módulos específicos)
// 2. Lista de módulos específicos (solo para módulos específicos)
// 3. Tabla de simulaciones disponibles con funcionalidad completa
import React, { useState, useEffect } from 'react';
import { useStudent } from '../context/StudentContext'; // Importar el hook
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  Brain, 
  ChevronDown, 
  Calendar,
  BarChart3,
  Users,
  Award,
  Clock,
  Heart,
  Cog,
  TrendingUp,
  GraduationCap,
  Leaf,
  Play,
  Trophy,
  Target,
  Zap,
  RotateCcw,
  Timer,
  CheckCircle2,
  AlertTriangle,
  Star,
  Lock,      // Icono de candado
  Send,      // Icono para enviar solicitud
  Hourglass  // Icono para estado pendiente
} from 'lucide-react';

/**
 * BACKEND: Componente de simulaciones con navegación por tipos
 * Flujo: Tipo de simulador → Módulos (si es específico) → Lista de simulaciones
 */
export function Simulaciones_Alumno_comp() {
  // Estados de navegación
  const [currentLevel, setCurrentLevel] = useState('tipos'); // 'tipos', 'modulos', 'simulaciones'
  const [selectedTipo, setSelectedTipo] = useState(null); // 'generales' | 'especificos'
  const [selectedModulo, setSelectedModulo] = useState(null); // Para módulos específicos
  const [simulaciones, setSimulaciones] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Estados para efectos visuales
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiScore, setConfettiScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  // Contexto del estudiante para manejar áreas permitidas y solicitudes
  const { allowedAreas, areaRequests, addAllowedArea, requestNewAreaAccess } = useStudent();

  // Estados para historial de intentos
  const [showHistorialModal, setShowHistorialModal] = useState(false);
  const [selectedSimulacionHistorial, setSelectedSimulacionHistorial] = useState(null);
  const [simulacionesHistorial, setSimulacionesHistorial] = useState({});

  // BACKEND: TODO - Conectar con API para módulos específicos
  const modulosEspecificos = [
    {
      id: 1,
      titulo: "Ciencias Exactas",
      color: "from-blue-500 to-cyan-600",
      icono: <BarChart3 className="w-6 h-6" />,
      descripcion: "Matemáticas, Física, Química y disciplinas afines",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      borderColor: "border-blue-200"
    },
    {
      id: 2,
      titulo: "Ciencias Sociales",
      color: "from-purple-500 to-indigo-600",
      icono: <Users className="w-6 h-6" />,
      descripcion: "Sociología, Psicología, Antropología y áreas relacionadas",
      bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50",
      borderColor: "border-purple-200"
    },
    {
      id: 3,
      titulo: "Humanidades y Artes",
      color: "from-rose-500 to-pink-600",
      icono: <BookOpen className="w-6 h-6" />,
      descripcion: "Literatura, Historia, Filosofía y expresiones artísticas",
      bgColor: "bg-gradient-to-br from-rose-50 to-pink-50",
      borderColor: "border-rose-200"
    },
    {
      id: 4,
      titulo: "Ciencias Naturales y de la Salud",
      color: "from-emerald-500 to-green-600",
      icono: <Heart className="w-6 h-6" />,
      descripcion: "Biología, Medicina, Enfermería y ciencias de la vida",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
      borderColor: "border-emerald-200"
    },
    {
      id: 5,
      titulo: "Ingeniería y Tecnología",
      color: "from-orange-500 to-amber-600",
      icono: <Cog className="w-6 h-6" />,
      descripcion: "Ingenierías, Tecnología, Sistemas y áreas técnicas",
      bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
      borderColor: "border-orange-200"
    },
    {
      id: 6,
      titulo: "Ciencias Económico-Administrativas",
      color: "from-teal-500 to-cyan-600",
      icono: <TrendingUp className="w-6 h-6" />,
      descripcion: "Administración, Economía, Contaduría y Negocios",
      bgColor: "bg-gradient-to-br from-teal-50 to-cyan-50",
      borderColor: "border-teal-200"
    },
    {
      id: 7,
      titulo: "Educación y Deportes",
      color: "from-violet-500 to-purple-600",
      icono: <GraduationCap className="w-6 h-6" />,
      descripcion: "Pedagogía, Educación Física y ciencias del deporte",
      bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
      borderColor: "border-violet-200"
    },
    {
      id: 8,
      titulo: "Agropecuarias",
      color: "from-lime-500 to-green-600",
      icono: <Leaf className="w-6 h-6" />,
      descripcion: "Agronomía, Veterinaria, Zootecnia y ciencias agropecuarias",
      bgColor: "bg-gradient-to-br from-lime-50 to-green-50",
      borderColor: "border-lime-200"
    }
  ];

  // BACKEND: TODO - Conectar con API para simulaciones generales
  const simulacionesGenerales = [
    {
      id: 1,
      nombre: "Simulador EXANI II - Completo",
      descripcion: "Examen Nacional de Ingreso a la Educación Superior",
      fechaEntrega: "2025-08-15",
      completado: true,
      fechaCompletado: "2025-07-06",
      score: 95,
      maxScore: 100,
      intentos: 1,
      maxIntentos: 3,
      tiempoLimite: "180 minutos",
      estado: "completado",
      tipo: "generales",
      categoria: "Ingreso Universitario",
      dificultad: "Alto"
    },
    {
      id: 2,
      nombre: "Pruebas Académicas Generales",
      descripcion: "Evaluación integral de conocimientos básicos",
      fechaEntrega: "2025-08-20",
      completado: false,
      fechaCompletado: null,
      score: null,
      maxScore: 100,
      intentos: 0,
      maxIntentos: 2,
      tiempoLimite: "120 minutos",
      estado: "disponible",
      tipo: "generales",
      categoria: "Evaluación General",
      dificultad: "Medio"
    },
    {
      id: 3,
      nombre: "Simulador PAA - Aptitud Académica",
      descripcion: "Prueba de Aptitud Académica",
      fechaEntrega: "2025-09-01",
      completado: false,
      fechaCompletado: null,
      score: null,
      maxScore: 100,
      intentos: 0,
      maxIntentos: 3,
      tiempoLimite: "150 minutos",
      estado: "disponible",
      tipo: "generales",
      categoria: "Aptitud Académica",
      dificultad: "Alto"
    },
    {
      id: 4,
      nombre: "Simulador CENEVAL EXANI II",
      descripcion: "Simulación oficial del examen CENEVAL",
      fechaEntrega: "2025-07-25",
      completado: true,
      fechaCompletado: "2025-07-20",
      score: 88,
      maxScore: 100,
      intentos: 2,
      maxIntentos: 3,
      tiempoLimite: "200 minutos",
      estado: "completado",
      tipo: "generales",
      categoria: "CENEVAL",
      dificultad: "Alto"
    }
  ];

  // BACKEND: TODO - Conectar con API para simulaciones específicas
  const simulacionesEspecificas = [
    {
      id: 5,
      nombre: "Simulador Medicina UNAM",
      descripcion: "Examen específico para carrera de Medicina",
      fechaEntrega: "2025-08-10",
      completado: false,
      fechaCompletado: null,
      score: null,
      maxScore: 100,
      intentos: 0,
      maxIntentos: 2,
      tiempoLimite: "240 minutos",
      estado: "disponible",
      tipo: "especificos",
      moduloId: 4, // Ciencias Naturales y de la Salud
      categoria: "Medicina",
      dificultad: "Alto"
    },
    {
      id: 6,
      nombre: "Simulador Ingeniería IPN",
      descripcion: "Examen para carreras de Ingeniería",
      fechaEntrega: "2025-08-25",
      completado: true,
      fechaCompletado: "2025-07-05",
      score: 85,
      maxScore: 100,
      intentos: 1,
      maxIntentos: 3,
      tiempoLimite: "180 minutos",
      estado: "completado",
      tipo: "especificos",
      moduloId: 5, // Ingeniería y Tecnología
      categoria: "Ingeniería",
      dificultad: "Alto"
    },
    {
      id: 7,
      nombre: "Simulador Ciencias Exactas",
      descripcion: "Matemáticas, Física y Química avanzadas",
      fechaEntrega: "2025-09-15",
      completado: false,
      fechaCompletado: null,
      score: null,
      maxScore: 100,
      intentos: 0,
      maxIntentos: 2,
      tiempoLimite: "200 minutos",
      estado: "disponible",
      tipo: "especificos",
      moduloId: 1, // Ciencias Exactas
      categoria: "Ciencias Exactas",
      dificultad: "Alto"
    },
    {
      id: 8,
      nombre: "Simulador Psicología UAM",
      descripcion: "Examen específico para Psicología",
      fechaEntrega: "2025-08-30",
      completado: false,
      fechaCompletado: null,
      score: null,
      maxScore: 100,
      intentos: 0,
      maxIntentos: 2,
      tiempoLimite: "160 minutos",
      estado: "disponible",
      tipo: "especificos",
      moduloId: 2, // Ciencias Sociales
      categoria: "Psicología",
      dificultad: "Medio"
    },
    {
      id: 9,
      nombre: "Simulador Humanidades UNAM",
      descripcion: "Letras, Filosofía y áreas humanísticas",
      fechaEntrega: "2025-09-05",
      completado: true,
      fechaCompletado: "2025-07-15",
      score: 92,
      maxScore: 100,
      intentos: 1,
      maxIntentos: 2,
      tiempoLimite: "140 minutos",
      estado: "completado",
      tipo: "especificos",
      moduloId: 3, // Humanidades y Artes
      categoria: "Humanidades",
      dificultad: "Medio"
    }
  ];

  // Meses como ordinales
  const months = [
    'Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto',
    'Séptimo', 'Octavo', 'Noveno', 'Décimo', 'Undécimo', 'Duodécimo'
  ];

  // Efecto para calcular el puntaje total
  useEffect(() => {
    const calculatedTotal = simulaciones.reduce((sum, sim) => sum + (sim.score || 0), 0);
    setTotalScore(calculatedTotal);
  }, [simulaciones]);

  // Hook para detectar si es móvil
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  // Función para manejar la selección de tipo de simulador
  const handleSelectTipo = (tipo) => {
    setSelectedTipo(tipo);
    if (tipo === 'especificos') {
      setCurrentLevel('modulos');
    } else {
      setCurrentLevel('simulaciones');
      setSimulaciones(simulacionesGenerales);
    }
  };

  // Función para manejar la selección de módulo específico
  const handleSelectModulo = (modulo) => {
    // Solo permitir la selección si el módulo está en las áreas permitidas
    if (allowedAreas.includes(modulo.id)) {
      setSelectedModulo(modulo);
      setCurrentLevel('simulaciones');
      const filteredSims = simulacionesEspecificas.filter(sim => sim.moduloId === modulo.id);
      setSimulaciones(filteredSims);
    } else {
      // Si no está permitido, se puede iniciar la solicitud desde la tarjeta
      console.log("Área no permitida. Debes solicitar acceso.");
    }
  };

  // Función para manejar la solicitud de acceso a un nuevo módulo
  const handleRequestAccess = (moduloId) => {
    // Evitar enviar múltiples solicitudes para la misma área
    if (areaRequests.some(req => req.areaId === moduloId)) {
      alert("Ya has enviado una solicitud para esta área.");
      return;
    }
    requestNewAreaAccess(moduloId);
    alert("Tu solicitud de acceso ha sido enviada. Recibirás una notificación cuando sea aprobada.");
  };

  // Función para manejar la primera selección de área del estudiante
  const handleInitialAreaSelection = (moduloId) => {
    addAllowedArea(moduloId);
    alert("¡Área seleccionada! Ahora tienes acceso a estas simulaciones.");
  };

  // Función para regresar al nivel anterior
  const handleGoBack = () => {
    if (currentLevel === 'simulaciones') {
      if (selectedTipo === 'especificos') {
        setCurrentLevel('modulos');
        setSimulaciones([]);
      } else {
        setCurrentLevel('tipos');
        setSelectedTipo(null);
        setSimulaciones([]);
      }
    } else if (currentLevel === 'modulos') {
      setCurrentLevel('tipos');
      setSelectedTipo(null);
      setSelectedModulo(null);
    }
  };

  // Filtrado por mes
  const filteredSimulaciones = simulaciones.filter(simulacion => {
    if (selectedMonth === 'all') return true;
    const simMonth = new Date(simulacion.fechaEntrega).getMonth();
    return simMonth === parseInt(selectedMonth);
  });

  const getSelectedMonthName = () => {
    if (selectedMonth === 'all') return 'Todos los meses';
    return months[parseInt(selectedMonth)];
  };

  const handleMonthSelect = (monthValue) => {
    setSelectedMonth(monthValue);
    setIsDropdownOpen(false);
  };

  // Verificar fecha límite
  const isWithinDeadline = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    return now < due;
  };

  const handleVisualizarResultados = (simulacionId) => {
    console.log('Visualizando resultados:', simulacionId);
    alert('Mostrando resultados de la simulación...');
  };

  // Verificar si la simulación está disponible para iniciar
  const isSimulacionAvailable = (simulacion) => {
    const now = new Date();
    const fechaEntrega = new Date(simulacion.fechaEntrega);
    return now <= fechaEntrega && simulacion.estado === 'disponible';
  };

  // Verificar si se puede reintentar (Función legacy - ahora permitimos reintentos ilimitados)
  const canRetry = (simulacion) => {
    return simulacion.completado;
  };

  // Funciones para manejar historial de intentos
  const initializeSimulacionHistorial = (simulacionId) => {
    if (!simulacionesHistorial[simulacionId]) {
      setSimulacionesHistorial(prev => ({
        ...prev,
        [simulacionId]: {
          intentos: [],
          totalIntentos: 0,
          mejorPuntaje: 0,
          promedioTiempo: 0
        }
      }));
    }
  };

  const addIntentoToHistorial = (simulacionId, intento) => {
    initializeSimulacionHistorial(simulacionId);
    
    setSimulacionesHistorial(prev => {
      const currentHistorial = prev[simulacionId] || { intentos: [], totalIntentos: 0, mejorPuntaje: 0 };
      const newIntentos = [...currentHistorial.intentos, intento];
      const nuevoMejorPuntaje = Math.max(currentHistorial.mejorPuntaje, intento.puntaje);
      
      return {
        ...prev,
        [simulacionId]: {
          ...currentHistorial,
          intentos: newIntentos,
          totalIntentos: newIntentos.length,
          mejorPuntaje: nuevoMejorPuntaje,
          promedioTiempo: newIntentos.reduce((sum, i) => sum + i.tiempoEmpleado, 0) / newIntentos.length
        }
      };
    });
  };

  const getSimulacionHistorial = (simulacionId) => {
    return simulacionesHistorial[simulacionId] || { 
      intentos: [], 
      totalIntentos: 0, 
      mejorPuntaje: 0, 
      promedioTiempo: 0 
    };
  };

  const getBestScore = (simulacionId) => {
    const historial = getSimulacionHistorial(simulacionId);
    return historial.mejorPuntaje || 0;
  };

  const getTotalAttempts = (simulacionId) => {
    const historial = getSimulacionHistorial(simulacionId);
    return historial.totalIntentos || 0;
  };

  // Funciones para manejar acciones de simulaciones con historial
  const handleIniciarSimulacionConHistorial = (simulacionId) => {
    // Simular inicio de simulación con resultado
    const simulatedScore = Math.floor(Math.random() * 100) + 1;
    const simulatedTime = Math.floor(Math.random() * 120) + 30; // 30-150 minutos
    
    const nuevoIntento = {
      id: Date.now(),
      fecha: new Date().toISOString(),
      puntaje: simulatedScore,
      tiempoEmpleado: simulatedTime,
      estado: 'completado'
    };

    addIntentoToHistorial(simulacionId, nuevoIntento);
    
    // Actualizar simulación
    setSimulaciones(prev => prev.map(sim => 
      sim.id === simulacionId 
        ? { 
            ...sim, 
            completado: true, 
            score: simulatedScore,
            bestScore: Math.max(sim.bestScore || 0, simulatedScore),
            fechaCompletado: new Date().toISOString().split('T')[0],
            estado: 'completado'
          }
        : sim
    ));

    // Efecto visual de confetti
    setConfettiScore(simulatedScore);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    console.log('Simulación completada:', simulacionId, 'Puntaje:', simulatedScore);
  };

  const handleReintentarConHistorial = (simulacionId) => {
    handleIniciarSimulacionConHistorial(simulacionId);
  };

  const handleVerHistorial = (simulacion) => {
    setSelectedSimulacionHistorial(simulacion);
    setShowHistorialModal(true);
  };

  const closeHistorialModal = () => {
    setShowHistorialModal(false);
    setSelectedSimulacionHistorial(null);
  };

  // Simular algunos intentos previos para las simulaciones completadas
  useEffect(() => {
    simulacionesGenerales.concat(simulacionesEspecificas).forEach(sim => {
      if (sim.completado && !simulacionesHistorial[sim.id]) {
        const numIntentosPrevios = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numIntentosPrevios; i++) {
          const fechaIntento = new Date();
          fechaIntento.setDate(fechaIntento.getDate() - (numIntentosPrevios - i) * 7);
          
          const intento = {
            id: Date.now() + i,
            fecha: fechaIntento.toISOString(),
            puntaje: Math.floor(Math.random() * 30) + 70, // 70-100
            tiempoEmpleado: Math.floor(Math.random() * 60) + 60, // 60-120 minutos
            estado: 'completado'
          };
          
          addIntentoToHistorial(sim.id, intento);
        }
      }
    });
  }, []);

  // Función actualizada para iniciar simulación
  const handleIniciarSimulacion = (simulacionId) => {
    handleIniciarSimulacionConHistorial(simulacionId);
  };

  // Función actualizada para reintentar
  const handleReintentar = (simulacionId) => {
    handleReintentarConHistorial(simulacionId);
  };

  // Función para obtener el color de la dificultad
  const getDifficultyColor = (dificultad) => {
    switch (dificultad) {
      case 'Bajo':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Medio':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Alto':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // NIVEL 1: Tipos de simuladores
  const renderTipos = () => (
    <div className="min-h-screen bg-white p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
          <div className="px-6 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Portal de Simulaciones
                </h1>
                <p className="text-gray-600">
                  Simuladores para exámenes de ingreso y evaluaciones académicas
                </p>
              </div>
              <div className="mt-4 lg:mt-0 flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>Actualizado hoy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Título estilizado */}
        <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 rounded-xl border border-purple-200 shadow-md p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/30 to-blue-100/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-100/30 to-purple-100/30 rounded-full blur-xl"></div>
          
          <div className="flex items-center justify-center relative z-10">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-2 h-2 text-white" />
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-700 bg-clip-text text-transparent">
                  SIMULADORES
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"></div>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjetas de tipos de simulador */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Simulador por áreas generales */}
          <div
            onClick={() => handleSelectTipo('generales')}
            className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Simulador por</h3>
              <h4 className="text-lg font-semibold text-purple-700 mb-4">áreas generales</h4>
              <p className="text-gray-700 mb-6 leading-relaxed">
                EXANI II, PAA y evaluaciones generales para ingreso universitario
              </p>
              <div className="inline-flex items-center text-purple-600 font-medium text-sm">
                <span>ACCEDER</span>
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Simulador por módulos específicos */}
          <div
            onClick={() => handleSelectTipo('especificos')}
            className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Simulador por</h3>
              <h4 className="text-lg font-semibold text-indigo-700 mb-4">módulos específicos</h4>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Simulaciones especializadas por área de conocimiento y carrera
              </p>
              <div className="inline-flex items-center text-indigo-600 font-medium text-sm">
                <span>ACCEDER</span>
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // NIVEL 2: Módulos específicos (CON LÓGICA DE ACCESO Y ESTILO RESTAURADO)
  const renderModulos = () => {
    const hasInitialArea = allowedAreas.length > 0;

    return (
      <div className="min-h-screen bg-white p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header con navegación */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
            <div className="px-6 py-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleGoBack}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                      {hasInitialArea ? 'Módulos Específicos' : 'Elige tu Área de Interés'}
                    </h1>
                    <p className="text-gray-600">
                      {hasInitialArea 
                        ? 'Accede a tus áreas permitidas o solicita acceso a nuevas.'
                        : 'Selecciona tu primera área de conocimiento para empezar.'}
                    </p>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0 flex items-center text-sm text-gray-500">
                  <Brain className="w-4 h-4 mr-1" />
                  <span>{modulosEspecificos.length} módulos disponibles</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de módulos específicos con lógica de acceso y estilo restaurado */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {modulosEspecificos.map((modulo) => {
              const isAllowed = allowedAreas.includes(modulo.id);
              const request = areaRequests.find(req => req.areaId === modulo.id);
              const isPending = request && request.status === 'pending';

              let actionHandler = () => {};
              let footerContent;
              let cardClassName = `${modulo.bgColor} ${modulo.borderColor} border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group p-6 flex flex-col h-full`;
              let isClickable = false;

              if (hasInitialArea) {
                if (isAllowed) {
                  isClickable = true;
                  actionHandler = () => handleSelectModulo(modulo);
                  cardClassName += " cursor-pointer";
                  footerContent = (
                    <div className="inline-flex items-center text-gray-600 font-medium text-sm">
                      <span>Ver simulaciones</span>
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </div>
                  );
                } else if (isPending) {
                  cardClassName += " opacity-70"; // Sutilmente opaco
                  footerContent = (
                    <div className="inline-flex items-center text-yellow-800 font-medium text-sm bg-yellow-200/80 px-3 py-1 rounded-full">
                      <Hourglass className="w-4 h-4 mr-2" />
                      <span>Pendiente</span>
                    </div>
                  );
                } else {
                  isClickable = true;
                  actionHandler = () => handleRequestAccess(modulo.id);
                  cardClassName += " cursor-pointer";
                  footerContent = (
                    <div className="inline-flex items-center text-blue-600 font-medium text-sm">
                      <Lock className="w-4 h-4 mr-2" />
                      <span>Solicitar Acceso</span>
                    </div>
                  );
                }
              } else {
                // Estado inicial: Elige tu primera área
                isClickable = true;
                actionHandler = () => handleInitialAreaSelection(modulo.id);
                cardClassName += " cursor-pointer ring-4 ring-transparent hover:ring-indigo-400";
                footerContent = (
                  <div className="inline-flex items-center text-indigo-600 font-medium text-sm">
                    <span>Seleccionar esta área</span>
                    <CheckCircle2 className="w-4 h-4 ml-2" />
                  </div>
                );
              }

              return (
                <div key={modulo.id} onClick={isClickable ? actionHandler : undefined}>
                  <div className={cardClassName}>
                    <div className="text-center flex-grow">
                      <div className={`w-16 h-16 bg-gradient-to-br ${modulo.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                        {modulo.icono}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{modulo.titulo}</h3>
                      <p className="text-gray-700 text-sm mb-4 leading-relaxed">{modulo.descripcion}</p>
                    </div>
                    <div className="text-center mt-auto pt-4">
                      {footerContent}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // NIVEL 3: Tabla de simulaciones
  const renderSimulaciones = () => (
    <div className="min-h-screen bg-white p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header con navegación */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
          <div className="px-6 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleGoBack}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {selectedTipo === 'generales' ? 'Simulaciones Generales' : 
                     selectedModulo ? `Simulaciones - ${selectedModulo.titulo}` : 'Simulaciones'}
                  </h1>
                  <p className="text-gray-600">
                    {selectedTipo === 'generales' ? 'Exámenes generales de ingreso universitario' :
                     selectedModulo ? selectedModulo.descripcion : 'Simulaciones especializadas'}
                  </p>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 flex items-center text-sm text-gray-500">
                <Target className="w-4 h-4 mr-1" />
                <span>{filteredSimulaciones.length} simulaciones disponibles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Título estilizado */}
        <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 rounded-xl border border-cyan-200 shadow-md p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-100/30 to-indigo-100/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100/30 to-cyan-100/30 rounded-full blur-xl"></div>
          
          <div className="flex items-center justify-center relative z-10">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-2 h-2 text-white" />
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  SIMULACIONES DISPONIBLES
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="text-lg font-semibold text-gray-800">
              Filtrar simulaciones
            </div>
            
            {/* Selector de mes */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-64 px-4 py-2 text-left bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{getSelectedMonthName()}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <div className="py-1">
                    <button
                      onClick={() => handleMonthSelect('all')}
                      className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${selectedMonth === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                    >
                      Todos los meses
                    </button>
                    {months.map((month, index) => (
                      <button
                        key={index}
                        onClick={() => handleMonthSelect(index.toString())}
                        className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${selectedMonth === index.toString() ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Vista de escritorio - Tabla de simulaciones */}
        <div className="hidden lg:block bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Simulación
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha límite
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ejecutar
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entregado
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volver a intentar
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visualizar
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Historial
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Puntaje
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSimulaciones.length > 0 ? (
                  filteredSimulaciones.map((simulacion, index) => (
                    <tr key={simulacion.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {simulacion.nombre}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {new Date(simulacion.fechaEntrega).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {isSimulacionAvailable(simulacion) ? (
                          <button
                            onClick={() => handleIniciarSimulacion(simulacion.id)}
                            className="relative px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-b-4 border-red-700 hover:border-red-800 active:scale-95 active:border-b-2"
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              <span className="mr-2">🚀</span>
                              START
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-t from-red-700/20 to-transparent rounded-lg"></div>
                          </button>
                        ) : (
                          <button
                            disabled
                            className="px-4 py-2 bg-gray-300 cursor-not-allowed text-gray-500 rounded-lg text-sm font-medium"
                          >
                            {!isWithinDeadline(simulacion.fechaEntrega) ? 'VENCIDO' : 'NO DISPONIBLE'}
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {simulacion.completado ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <AlertTriangle className="w-6 h-6 text-red-500 mx-auto" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {simulacion.completado ? (
                          <button
                            onClick={() => handleReintentar(simulacion.id)}
                            className="relative px-5 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-b-3 border-red-600 hover:border-red-700 active:scale-95 active:border-b-1"
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              <span className="mr-1">🔄</span>
                              REINTENTAR
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent rounded-lg"></div>
                          </button>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {simulacion.completado ? (
                          <button
                            onClick={() => handleVisualizarResultados(simulacion.id)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver resultados"
                          >
                            <Trophy className="w-5 h-5" />
                          </button>
                        ) : (
                          <button
                            disabled
                            className="p-2 text-gray-300 cursor-not-allowed rounded-lg"
                            title="Ver resultados"
                          >
                            <Trophy className="w-5 h-5" />
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {simulacion.completado && getTotalAttempts(simulacion.id) > 0 ? (
                          <button
                            onClick={() => handleVerHistorial(simulacion)}
                            className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
                          >
                            <FileText className="w-3 h-3 mr-1" />
                            Ver historial ({getTotalAttempts(simulacion.id)})
                          </button>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="text-sm text-gray-900 font-medium">
                          {simulacion.completado ? (
                            <div className="space-y-1">
                              <div className="font-bold text-green-600">
                                {getBestScore(simulacion.id)} %
                              </div>
                              {getTotalAttempts(simulacion.id) > 1 && (
                                <div className="text-xs text-gray-500">
                                  Mejor de {getTotalAttempts(simulacion.id)} intentos
                                </div>
                              )}
                            </div>
                          ) : (
                            '0 %'
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
                      No hay simulaciones para el mes seleccionado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vista móvil - Cards de simulaciones */}
        <div className="lg:hidden space-y-4">
          {filteredSimulaciones.length > 0 ? (
            filteredSimulaciones.map((simulacion, index) => (
              <div
                key={simulacion.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-6"
              >
                {/* Badge de estado */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">{simulacion.nombre}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Límite: {new Date(simulacion.fechaEntrega).toLocaleDateString('es-ES')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                      <span className="text-sm font-medium text-gray-900">
                        {simulacion.completado ? (
                          <div className="flex flex-col">
                            <span className="font-bold text-green-600">
                              {getBestScore(simulacion.id)} %
                            </span>
                            {getTotalAttempts(simulacion.id) > 1 && (
                              <span className="text-xs text-gray-500">
                                Mejor de {getTotalAttempts(simulacion.id)} intentos
                              </span>
                            )}
                          </div>
                        ) : (
                          '0 %'
                        )}
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    simulacion.completado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {simulacion.completado ? 'Completado' : 'Pendiente'}
                  </span>
                </div>
                
                {/* Botones de acción para simulaciones */}
                <div className="space-y-2">
                  {/* Botón Ejecutar */}
                  {isSimulacionAvailable(simulacion) && (
                    <button
                      onClick={() => handleIniciarSimulacion(simulacion.id)}
                      className="relative w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl text-base font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-b-4 border-red-700 hover:border-red-800 active:scale-95 active:border-b-2"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <span className="mr-3 text-xl">🚀</span>
                        EJECUTAR (START)
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-t from-red-700/30 to-transparent rounded-xl"></div>
                      <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  )}

                  {/* Botón Reintentar */}
                  {simulacion.completado && (
                    <button
                      onClick={() => handleReintentar(simulacion.id)}
                      className="relative w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl text-base font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-b-4 border-red-600 hover:border-red-700 active:scale-95 active:border-b-2"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <span className="mr-3 text-xl">🔄</span>
                        REINTENTAR
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 to-transparent rounded-xl"></div>
                      <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  )}

                  {/* Botón Ver Historial */}
                  {simulacion.completado && getTotalAttempts(simulacion.id) > 0 && (
                    <button
                      onClick={() => handleVerHistorial(simulacion)}
                      className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Ver Historial ({getTotalAttempts(simulacion.id)} intentos)
                    </button>
                  )}

                  {/* Botón Ver Resultados */}
                  {simulacion.completado && (
                    <button
                      onClick={() => handleVisualizarResultados(simulacion.id)}
                      className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center"
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Ver Resultados
                    </button>
                  )}

                  {/* Estado no disponible */}
                  {!isSimulacionAvailable(simulacion) && !simulacion.completado && (
                    <div className="w-full px-4 py-3 bg-gray-100 text-gray-600 rounded-lg text-center font-medium">
                      {!isWithinDeadline(simulacion.fechaEntrega) ? 'Simulación Vencida' : 'No Disponible'}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No hay simulaciones disponibles
              </h3>
              <p className="text-gray-600">
                {selectedMonth !== 'all' 
                  ? `No se encontraron simulaciones para ${getSelectedMonthName()}.`
                  : 'No hay simulaciones disponibles en este momento.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Modal para mostrar el historial de intentos - CORREGIDO
  const renderHistorialModal = () => {
    if (!showHistorialModal || !selectedSimulacionHistorial) return null;

    const historial = getSimulacionHistorial(selectedSimulacionHistorial.id);

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-8 pb-8 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl min-h-fit max-h-[calc(100vh-4rem)] overflow-hidden flex flex-col my-auto">
          {/* Header del modal */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold truncate">Historial de Intentos</h2>
                <p className="text-indigo-100 mt-1 text-base truncate">{selectedSimulacionHistorial.nombre}</p>
              </div>
              <button
                onClick={closeHistorialModal}
                className="text-white hover:text-gray-200 transition-colors ml-4 flex-shrink-0 p-2 hover:bg-white/10 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Contenido del modal - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Resumen estadístico */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="text-blue-600 text-sm font-medium">Total de Intentos</div>
                <div className="text-2xl font-bold text-blue-800">{historial.totalIntentos}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="text-green-600 text-sm font-medium">Mejor Puntaje</div>
                <div className="text-2xl font-bold text-green-800">{historial.mejorPuntaje}%</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <div className="text-purple-600 text-sm font-medium">Promedio de Tiempo</div>
                <div className="text-2xl font-bold text-purple-800">
                  {Math.round(historial.promedioTiempo || 0)} min
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                <div className="text-orange-600 text-sm font-medium">Último Intento</div>
                <div className="text-sm font-bold text-orange-800">
                  {historial.intentos.length > 0 
                    ? new Date(historial.intentos[historial.intentos.length - 1].fecha).toLocaleDateString('es-ES')
                    : 'N/A'
                  }
                </div>
              </div>
            </div>

            {/* Lista de intentos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Historial Detallado ({historial.intentos.length} intentos)
              </h3>
              
              {historial.intentos.length > 0 ? (
                <div className="max-h-80 overflow-y-auto bg-gray-50 rounded-xl border border-gray-200 p-4">
                  <div className="space-y-3">
                    {[...historial.intentos].reverse().map((intento, index) => (
                      <div
                        key={intento.id}
                        className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-4 min-w-0 flex-1">
                          <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                            {historial.intentos.length - index}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-gray-900 text-base">
                              Intento {historial.intentos.length - index}
                            </div>
                            <div className="text-sm text-gray-500 truncate">
                              {new Date(intento.fecha).toLocaleDateString('es-ES')} a las{' '}
                              {new Date(intento.fecha).toLocaleTimeString('es-ES', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 flex-shrink-0">
                          <div className="text-right">
                            <div className={`font-bold text-lg ${
                              intento.puntaje === historial.mejorPuntaje 
                                ? 'text-green-600' 
                                : 'text-gray-700'
                            }`}>
                              {intento.puntaje}%
                              {intento.puntaje === historial.mejorPuntaje && (
                                <span className="ml-1 text-yellow-500">👑</span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {intento.tiempoEmpleado} min
                            </div>
                          </div>
                          <div className={`w-2 h-8 rounded-full ${
                            intento.puntaje >= 90 ? 'bg-green-500' :
                            intento.puntaje >= 70 ? 'bg-yellow-500' :
                            intento.puntaje >= 50 ? 'bg-orange-500' : 'bg-red-500'
                          }`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-base">No hay intentos registrados para esta simulación.</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer del modal */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end flex-shrink-0 border-t border-gray-200">
            <button
              onClick={closeHistorialModal}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Renderizado principal basado en el nivel actual
  return (
    <div>
      {currentLevel === 'tipos' && renderTipos()}
      {currentLevel === 'modulos' && renderModulos()}
      {currentLevel === 'simulaciones' && renderSimulaciones()}
      
      {/* Modal de historial */}
      {selectedSimulacionHistorial && renderHistorialModal()}
      
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-6xl font-bold text-green-600 animate-bounce">
              🎉 {confettiScore}% 🎉
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Simulaciones_Alumno_comp;