Feature: U4 Registro de administradores
  Como administrador quiero poder dar de alta a otros administradores
  en la plataforma para acceder a las funcionalidades del sistema.    
  
  Scenario: U4.1 Registro exitoso de administrador
    Given No hay usuarios registrados
      And Me registro como pasajero con email "mateo@mateo.com" y wallet "wallethg0122jk32ew4ho123"
    When El administrador por defecto registra al usuario con email 'mateo@mateo.com' como administrador
    Then Existe un administrador con email 'mateo@mateo.com'
  
  Scenario: U4.2 Registro fallido de administrador falta email
    Given No hay usuarios registrados
    When El administrador por defecto registra un administrador sin email
    Then El sistema indicará que falta el email con mensaje "Error: Missing email"
     And el sistema no permitirá el registro

  Scenario: U4.3 Registro fallido de administrador error de servicio
    Given No hay usuarios registrados
      And Me registro como pasajero con email "mateo@mateo.com" y wallet "wallethg0122jk32ew4ho123"
      And El registro de administrador fallará por un error de servicio 
    When El administrador por defecto registra al usuario con email 'mateo@mateo.com' como administrador
    Then se devuelve un mensaje de error "Servicio no disponible"
