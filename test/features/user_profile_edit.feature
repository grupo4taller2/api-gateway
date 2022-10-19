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
    Then El nombre del pasajero con email 'mateo@mateo.com' cambio a 'Mateo'

    Scenario: P1.2 Edición de apellido exitosa para pasajero
    Given No hay usuarios registrados
    When Quiero registrarme como pasajero con usuario 'mateo'
      And quiero registrarme como pasajero con email 'mateo@mateo.com'
      And quiero registrarme como pasajero con nombre 'Mateo'
      And quiero registrarme como pasajero con apellido 'cALVO'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con wallet '8s7hmbw83m4tv8wughcm0s8ercmg'
      And quiero registrarme como pasajero con ubicacion preferida 'Av. Paseo Colón 850'
      And me registro como pasajero
      And como pasajero con email 'mateo@mateo.com' cambio mi apellido a 'Calvo'
    Then El apellido del pasajero con email 'mateo@mateo.com' cambio a 'Calvo'

    Scenario: P1.3 Edición de telefono exitosa para pasajero
    Given No hay usuarios registrados
    When Quiero registrarme como pasajero con usuario 'mateo'
      And quiero registrarme como pasajero con email 'mateo@mateo.com'
      And quiero registrarme como pasajero con nombre 'Mateo'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con wallet '8s7hmbw83m4tv8wughcm0s8ercmg'
      And quiero registrarme como pasajero con ubicacion preferida 'Av. Paseo Colón 850'
      And me registro como pasajero
      And como pasajero con email 'mateo@mateo.com' cambio mi telefono a '+54111522222222'
    Then El telefono del pasajero con email 'mateo@mateo.com' cambio a '+54111522222222'

    Scenario: P1.4 Edición de wallet exitosa para pasajero
    Given No hay usuarios registrados
    When Quiero registrarme como pasajero con usuario 'mateo'
      And quiero registrarme como pasajero con email 'mateo@mateo.com'
      And quiero registrarme como pasajero con nombre 'Mateo'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con wallet '8s7hmbw83m4tv8wughcm0s8ercmg'
      And quiero registrarme como pasajero con ubicacion preferida 'Av. Paseo Colón 850'
      And me registro como pasajero
      And como pasajero con email 'mateo@mateo.com' cambio mi wallet a 'a8o7sdfyb879as6fb78as'
    Then La wallet del pasajero con email 'mateo@mateo.com' cambio a 'a8o7sdfyb879as6fb78as'

    Scenario: P1.5 Edición de ubicacion preferida exitosa para pasajero
    Given No hay usuarios registrados
    When Quiero registrarme como pasajero con usuario 'mateo'
      And quiero registrarme como pasajero con email 'mateo@mateo.com'
      And quiero registrarme como pasajero con nombre 'Mateo'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con wallet '8s7hmbw83m4tv8wughcm0s8ercmg'
      And quiero registrarme como pasajero con ubicacion preferida 'Av. Paseo Colón 850'
      And me registro como pasajero
      And como pasajero con email 'mateo@mateo.com' cambio mi ubicacion preferida a 'Av. Las Heras 2214'
    Then La ubicacion preferida del pasajero con email 'mateo@mateo.com' cambio a 'Av. Las Heras 2214'
