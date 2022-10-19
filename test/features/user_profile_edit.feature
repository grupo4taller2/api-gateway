Feature: P1 Edicion de perfil
  Como usuario quiero poder editar los datos de mi perfil de usuario
  para mantener actualizada mi información personal.
  
  Scenario: P1.1 Edición de nombre exitosa para pasajero
    Given No hay usuarios registrados
    When Quiero registrarme como pasajero con usuario 'mateo'
      And quiero registrarme como pasajero con email 'mateo@mateo.com'
      And quiero registrarme como pasajero con nombre 'mATEO'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con wallet '8s7hmbw83m4tv8wughcm0s8ercmg'
      And quiero registrarme como pasajero con ubicacion preferida 'Av. Paseo Colón 850'
      And me registro como pasajero
      And como pasajero con email 'mateo@mateo.com' cambio mi nombre a 'Mateo'
    Then El nombre del pasajero con email 'mateo@mateo.com' es 'Mateo'
