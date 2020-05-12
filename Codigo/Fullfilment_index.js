// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  
  function comienzo(agent){
    agent.add(`Buenas, este es un ChatBot con árboles de decisión para informar acerca del Coronavirus y la situación en la que vivimos debido a este.`);
    agent.add(`Si no sabes exactamente que tipo de preguntas puedes hacer dentro de un tema, debajo de la barra para escribir mensajes apararecerán recomendaciones.`);
    agent.add(`Recuerda que puedes volver a ver este mensaje siempre que quieras escribiendo "/start" en el chat y dandole a "Enviar".`);
    agent.add(`A continuación, escribe alguno de los siguientes temas para recibir información sobre él:`);
    agent.add(`- Información General`);
    agent.add(`- Síntomas`);
    agent.add(`- Prevención`);
    agent.add(`- Salidas Autorizadas`);
    agent.add(`- Permisos de conducir`);
    agent.add(`- Vehículos`);
    agent.add(`- Circulación`);
    agent.add(`- Otros`);
  }
  
  //Categorías
  function salidas(agent) {
    agent.add(`Aquí puedes preguntar cualquier cosa sobre las salidas que están autorizadas, ¡intentaré responderte de la mejor manera posible!`);
    agent.add(new Suggestion('Horarios de salida'));
  }
  
  function otros(agent) {
    agent.add(`Aquí puedes preguntar cualquier otra cosa relacionada con el Coronavirus que no hayas encontrado en los otros temas, ¡intentaré responderte de la mejor manera posible!`);
    agent.add(new Suggestion('¿Quien corre mas riesgo?'));
  }
 
  function prevencion(agent) {
    agent.add(`Aquí puedes preguntar cualquier cosa sobre la prevención, ¡intentaré responderte de la mejor manera posible!`);
    agent.add(new Suggestion('¿Cómo protegerse?'));
  }
  
  function sintomas(agent) {
    agent.add(`Aquí puedes preguntar cualquier cosa sobre los síntomas, ¡intentaré responderte de la mejor manera posible!`);
    agent.add(new Suggestion('¿Cuáles son los síntomas?'));
  }
  
  function general(agent) {
    agent.add(`Aquí puedes preguntar cualquier cosa que sea de información general, ¡intentaré responderte de la mejor manera posible!`);
    agent.add(new Suggestion('¿Qué es el coronavirus?'));
  }
  
  function permisosDeConducir(agent){
    agent.add(`Aquí puedes preguntar cualquier cosa sobre permisos de conducir, ¡intentaré responderte de la mejor manera posible!`);
    agent.add(new Suggestion('¿Puedo conducir con mi permiso caducado?'));
  }
  
  function vehiculos(agent){
    agent.add(`Aquí puedes preguntar cualquier cosa sobre vehículos, ¡intentaré responderte de la mejor manera posible!`);
    agent.add(new Suggestion('¿Puedo llevar mi coche a reparar al taller?'));
  }
  
  function circulacion(agent){
    agent.add(`Aquí puedes preguntar cualquier cosa sobre circulación, ¡intentaré responderte de la mejor manera posible!`);
    agent.add(new Suggestion('¿Cuántos pasajeros pueden ir en un vehículo?'));
  }  
    
  //Categoría Otros
  function quienCorreMasRiesgo(agent){
    agent.add(`Todavía tenemos mucho por aprender sobre la forma en que la COVID-2019 afecta a los humanos, pero parece que las personas mayores y las que padecen afecciones médicas preexistentes (como hipertensión arterial, enfermedades cardiacas o diabetes) desarrollan casos graves de la enfermedad con más frecuencia que otras.`);
    agent.add(new Suggestion('¿Me debo preocupar?'));
  }
  
  function deboPreocuparme(agent){
    agent.add(`Por lo general, los síntomas de la COVID-19 son leves, sobre todo en los niños y los adultos jóvenes. No obstante, también pueden ser graves y obligan a hospitalizar a alrededor de uno de cada cinco infectados. Por consiguiente, es bastante normal preocuparse por los efectos que el brote de COVID-19 puede tener en nosotros y en nuestros seres queridos.`);
    agent.add(`Esta preocupación debe servirnos para adoptar medidas de protección para nosotros, nuestros seres queridos y las comunidades donde vivimos.`);
    agent.add(new Suggestion('¿Quien corre mas riesgo?'));
    agent.add(new Suggestion('¿Puede mi mascota contagiarme?'));
  } 
  
  function puedeMiMascotaContagiarme(agent){
    agent.add(`Tenemos conocimiento de casos en los que animales y mascotas de pacientes con COVID-19 han resultado infectados. Existe la posibilidad de que algunos animales resulten infectados por un contacto estrecho con personas infectadas. Se necesitan más datos para saber si los animales y las mascotas pueden propagar la enfermedad, aunque los datos actuales indican que la transmisión directa entre seres humanos sigue siendo el principal factor de propagación.`);
    agent.add(`Aún es demasiado pronto para determinar si los gatos podrían actuar como hospedador intermedio en la transmisión de la COVID-19.`);
    agent.add(new Suggestion('¿Me debo preocupar?'));
  }
  
  //Categoría Prevención
  function comoProtegerse(agent){
    agent.add(`* Lávese las manos a fondo y con frecuencia usando un desinfectante a base de alcohol o con agua y jabón.`);
    agent.add(`¿Por qué? Lavarse las manos con agua y jabón o usando un desinfectante a base de alcohol mata los virus que pueda haber en sus manos.`);
    agent.add(`* Mantenga una distancia mínima de 1 metro (3 pies) entre usted y cualquier persona que tosa o estornude.`);
    agent.add(`¿Por qué? Cuando alguien tose o estornuda, despide por la nariz o por la boca unas gotículas de líquido que pueden contener el virus. Si está demasiado cerca, puede respirar las gotículas y con ellas el virus de la COVID-19, si la persona que tose tiene la enfermedad.`);
    agent.add(`* Evite tocarse los ojos, la nariz y la boca.`);
    agent.add(`¿Por qué? Las manos tocan muchas superficies y pueden recoger virus. Una vez contaminadas, las manos pueden transferir el virus a los ojos, la nariz o la boca. Desde allí, el virus puede entrar en su cuerpo y causarle la enfermedad.`);
    agent.add(`* Tanto usted como las personas que les rodean deben asegurarse de mantener una buena higiene de las vías respiratorias. Eso significa cubrirse la boca y la nariz con el codo doblado o con un pañuelo de papel al toser o estornudar. El pañuelo usado debe desecharse de inmediato.`);
    agent.add(`¿Por qué? Los virus se propagan a través de las gotículas. Al mantener una buena higiene respiratoria está protegiendo a las personas que le rodean de virus como los del resfriado, la gripe y la COVID-19.`);
    agent.add(`* Permanezca en casa si no se encuentra bien. Si tiene fiebre, tos y dificultad para respirar, busque atención médica y llame con antelación. Siga las instrucciones de las autoridades sanitarias locales.`);
    agent.add(`¿Por qué? Las autoridades nacionales y locales dispondrán de la información más actualizada sobre la situación en su zona. Llamar con antelación permitirá que su dispensador de atención de salud le dirija rápidamente hacia el centro de salud adecuado. Esto también le protegerá a usted y ayudará a prevenir la propagación de virus y otras infecciones.`);
    agent.add(`* Manténgase informado sobre las últimas novedades en relación con la COVID-19. Siga los consejos de su dispensador de atención de salud, de las autoridades sanitarias pertinentes a nivel nacional y local o de su empleador sobre la forma de protegerse a sí mismo y a los demás ante la COVID-19.`);
    agent.add(`¿Por qué? Las autoridades nacionales y locales dispondrán de la información más actualizada acerca de si la COVID-19 se está propagando en su zona. Son los interlocutores más indicados para dar consejos sobre lo que debe hacer la gente de su zona para protegerse.`);
    agent.add(`* Consulte las noticias más recientes sobre las zonas de mayor peligro (es decir, las ciudades y lugares donde la enfermedad se está propagando más extensamente). Si le es posible, evite desplazarse a estas zonas, sobre todo si su edad es avanzada o tiene usted diabetes, cardiopatías o neumopatías.`);
    agent.add(`¿Por qué? Estas precauciones se deben adoptar en estas zonas porque la probabilidad de contraer la COVID-19 es más elevada.`);
    agent.add(new Suggestion('¿Debo llevar mascarilla?'));
  }
  
  function deboLlevarMascarilla(agent){
    agent.add(`Si no se presentan los síntomas respiratorios característicos de la COVID-19 (sobre todo, tos) o no se cuida de una persona que pueda haber contraído esta enfermedad, no es necesario llevar puesta una mascarilla clínica. Recuerde que las mascarillas desechables solo se pueden utilizar una vez y tenga en cuenta también que, si no está usted enfermo o no cuida de una persona que lo esté, está malgastando una mascarilla. Las existencias de mascarillas en el mundo se están agotando, y la OMS insta a utilizarlas de forma sensata.`);
    agent.add(new Suggestion('¿Cómo protegerse?'));
    agent.add(new Suggestion('¿Cómo usar la mascarilla?'));
  }
  
  function comoUsarLaMascarilla(agent){
    agent.add(`1. Recuerde que solo deben usar mascarilla los trabajadores sanitarios, los cuidadores y las personas con síntomas respiratorios como fiebre y tos.`);
    agent.add(`2. Antes de tocar la mascarilla, lávese las manos con un desinfectante a base de alcohol o con agua y jabón.`);
    agent.add(`3. Inspeccione la mascarilla para ver si tiene rasgaduras o agujeros.`);
    agent.add(`4. Oriente hacia arriba la parte superior (donde se encuentra la tira de metal).`);
    agent.add(`5. Asegúrese de orientar hacia afuera el lado correcto de la mascarilla (el lado coloreado).`);
    agent.add(`6. Colóquese la mascarilla sobre la cara. Pellizque la tira de metal o el borde rígido de la mascarilla para que se amolde a la forma de su nariz.`);
    agent.add(`7. Tire hacia abajo de la parte inferior de la mascarilla para que le cubra la boca y la barbilla.`);
    agent.add(`8. Después de usarla, quítese la mascarilla; retire las cintas elásticas de detrás de las orejas manteniendo la mascarilla alejada de la cara y la ropa, para no tocar las superficies potencialmente contaminadas de la mascarilla.`);
    agent.add(`9. Deseche la mascarilla en un contenedor cerrado inmediatamente después de su uso.`);
    agent.add(`10. Lávese las manos después de tocar o desechar la mascarilla. Use un desinfectante a base de alcohol o, si están visiblemente sucias, láveselas con agua y jabón.`);
    agent.add(new Suggestion('¿Debo llevar mascarilla?'));
    agent.add(new Suggestion('¿Son eficaces los antibioticos?'));
  }
  
  function sonEficacesLosAntibioticos(agent){
    agent.add(`No. Los antibióticos no son eficaces contra los virus, solo contra las infecciones bacterianas. La COVID‑19 está causada por un virus, de modo que los antibióticos no sirven frente a ella. No se deben usar antibióticos como medio de prevención o tratamiento de la COVID‑19. Solo deben usarse para tratar una infección bacteriana siguiendo las indicaciones de un médico.`);
    agent.add(new Suggestion('¿Cómo usar la mascarilla?'));
    agent.add(new Suggestion('¿Cómo se propaga el coronavirus?'));
  }
  
  function comoSePropagaElCoronavirus(agent){
    agent.add(`Una persona puede contraer la COVID‑19 por contacto con otra que esté infectada por el virus. La enfermedad se propaga principalmente de persona a persona a través de las gotículas que salen despedidas de la nariz o la boca de una persona infectada al toser, estornudar o hablar.`);
    agent.add(`Estas gotículas son relativamente pesadas, no llegan muy lejos y caen rápidamente al suelo. Una persona puede contraer la COVID‑19 si inhala las gotículas procedentes de una persona infectada por el virus. Por eso es importante mantenerse al menos a un metro (3 pies) de distancia de los demás.`);
    agent.add(` Estas gotículas pueden caer sobre los objetos y superficies que rodean a la persona, como mesas, pomos y barandillas, de modo que otras personas pueden infectarse si tocan esos objetos o superficies y luego se tocan los ojos, la nariz o la boca. Por ello es importante lavarse las manos frecuentemente con agua y jabón o con un desinfectante a base de alcohol.`);
    agent.add(new Suggestion('¿Son eficaces los antibioticos?'));
    agent.add(new Suggestion('¿Cómo comprar con seguridad en una tienda?'));
  }
  
  function comoComprarConSeguridadEnUnaTienda(agent){
    agent.add(`En las tiendas de comestibles, mantenga al menos un metro de distancia con los demás y no se toque los ojos, la nariz o la boca. Si es posible, desinfecte los mangos y barras de los carritos o cestas antes de comprar. Cuando regrese a casa, lávese las manos a fondo al llegar y también después de coger y almacenar los productos que ha comprado.`);
    agent.add(`Actualmente no hay ningún caso confirmado de contagio de la COVID‑19 a través de los alimentos o de sus envases.`);
    agent.add(new Suggestion('¿Cómo se propaga el coronavirus?'));
    agent.add(new Suggestion('¿Hay algo que no deba hacer?'));
  }   
  
  function hayAlgoQueNoDebaHacer(agent){
    agent.add(`Las siguientes medidas NO SON eficaces contra la COVID-2019 y pueden resultar perjudiciales:`);
    agent.add(`Fumar`);
    agent.add(`Llevar varias mascarillas`);
    agent.add(`Tomar antibióticos`);
    agent.add(new Suggestion('¿Cómo comprar con seguridad en una tienda?'));
  }
  
  //Categoría Síntomas
  function cualesSonLosSintomas(agent){
    agent.add(`Los síntomas más comunes de la COVID‑19 son fiebre, tos seca y cansancio. Algunos pacientes pueden presentar dolores, congestión nasal, dolor de garganta o diarrea. Estos síntomas suelen ser leves y aparecen de forma gradual. Algunas personas se infectan pero solo presentan síntomas muy leves.`);
    agent.add(`Alrededor de 1 de cada 5 personas que contraen la COVID‑19 desarrolla una enfermedad grave y tiene dificultad para respirar.`);
    agent.add(`Las personas de todas las edades que tengan fiebre, tos y dificultad para respirar deben buscar atención médica.`);
    agent.add(new Suggestion('¿Cuánto dura el periodo de incubación?'));
  }
  
  function cuantoDuraElPeriodoDeIncubacion(agent){
    agent.add(`El «período de incubación» es el tiempo que transcurre entre la infección por el virus y la aparición de los síntomas de la enfermedad. La mayoría de las estimaciones respecto al periodo de incubación de la COVID-19 oscilan entre 1 y 14 días, y en general se sitúan en torno a cinco días.`);
    agent.add(new Suggestion('¿Cuáles son los síntomas?'));
  }
  
  //Categoría Información General
  function queEsElCoronavirus(agent){
    agent.add(`Los coronavirus son una extensa familia de virus que pueden causar enfermedades tanto en animales como en humanos. En los humanos, se sabe que varios coronavirus causan infecciones respiratorias que pueden ir desde el resfriado común hasta enfermedades más graves como el síndrome respiratorio de Oriente Medio (MERS) y el síndrome respiratorio agudo severo (SRAS).`);
    agent.add(`La COVID-19 es la enfermedad infecciosa causada por el coronavirus que se ha descubierto más recientemente.`);
    agent.add(new Suggestion('¿Cuál es la fuente del coronavirus?'));
  }
  
  function cualEsLaFuenteDelCoronavirus(agent){
    agent.add(`Hasta la fecha se desconoce la fuente del SARS-CoV-2, el coronavirus (CoV) que causa la COVID-19. Todos los datos disponibles sugieren que el SARS-CoV-2 tiene un origen animal y no es un virus creado en laboratorio. Lo más probable es que el virus tenga su reservorio natural en los murciélagos. El SARS-CoV-2 pertenece a un grupo de virus genéticamente afines en el que se encuentran también el SARS-CoV y otros CoV que han podido aislarse en poblaciones de murciélagos.`);
    agent.add(new Suggestion('¿Qué es el coronavirus?'));
    agent.add(new Suggestion('¿Qué probabilidad hay de contagiarse?'));
  }
  
  function queProbabilidadHayDeContagiarse(agent){
    agent.add(`El riesgo depende del lugar donde se encuentre usted y, más concretamente, de si se está produciendo un brote de COVID-19 en dicho lugar.`);
    agent.add(`Para la mayoría de las personas que se encuentran en la mayor parte de los lugares, el riesgo de contraer esta enfermedad continúa siendo bajo. Sin embargo, sabemos que hay algunos lugares (ciudades o zonas) donde se está propagando y donde el riesgo de contraerla es más elevado, tanto para las personas que viven en ellas como para las que las visitan.`);
    agent.add(new Suggestion('¿Cuál es la fuente del coronavirus?'));
    agent.add(new Suggestion('¿Existe alguna vacuna?'));
  }
  
  function existeAlgunaVacuna(agent){
    agent.add(`Hasta la fecha, no hay ninguna vacuna ni medicamento antiviral específico para prevenir o tratar la COVID-2019. Sin embargo, los afectados deben recibir atención de salud para aliviar los síntomas. Las personas que presentan casos graves de la enfermedad deben ser hospitalizadas. Se están investigando posibles vacunas y distintos tratamientos farmacológicos específicos. Hay ensayos clínicos en curso para ponerlos a prueba. La OMS está coordinando los esfuerzos dirigidos a desarrollar vacunas y medicamentos para prevenir y tratar la COVID-19.`);
    agent.add(new Suggestion('¿Qué probabilidad hay de contagiarse?'));
    agent.add(new Suggestion('¿Cuánto tiempo sobrevive el coronavirus en la superficie?'));
  }
  
  function cuantoTiempoSobreviveElCoronavirusEnLaSuperficie(agent){
    agent.add(`No se sabe con certeza cuánto tiempo sobrevive el virus causante de la COVID-19 en una superficie, pero parece comportarse como otros coronavirus. Los estudios realizados (incluida la información preliminar disponible sobre el virus de la COVID-19) indican que los coronavirus pueden subsistir en una superficie desde unas pocas horas hasta varios días. El tiempo puede variar en función de las condiciones (por ejemplo, el tipo de superficie, la temperatura o la humedad del ambiente).`);
    agent.add(new Suggestion('¿Existe alguna vacuna?'));
  }
  
  //Categoría Salidas Autorizadas
  function horariosDeSalida(agent){
    agent.add(`- De 6 a 10 de la mañana y de 20 a 23 horas: Actividad física individual y paseos para personas entre 15 y 69 años.`);
    agent.add(`- De 10 a 12 de la mañana y de 19 a 20 horas: Personas que requieran salir acompañadas por ser dependientes o los mayores de 70.`);
    agent.add(`- De 12 de la mañana a 7 de la tarde: Menores de 14 años.`);
    agent.add(new Suggestion('Fechas de las etapas de la desescalada'));
  }
  
  function fechasDeLasEtapasDeLaDesescalada(agent){
    agent.add(`A continuación, se mostrarán las fechas en las que se dará cada fase de la desescalada:`);
    agent.add(`- Fase 0: Del 28 de abril al 10 de mayo.`);
    agent.add(`- Fase 1: Del 11 de mayo al 24 de mayo.`);
    agent.add(`- Fase 2: Del 25 de mayo al 7 de junio.`);
    agent.add(`- Fase 3: Del 8 de junio al 21 de junio`);
    agent.add(new Suggestion('Horarios de salida'));
    agent.add(new Suggestion('Fase 0'));
  }
  
  function fase0(agent){
    agent.add(`Esta es la fase de preparación en la que se podrá llevar a cabo lo siguiente:`);
    agent.add(`- Personal: Paseos de niños, mayores y convivientes.`);
    agent.add(`- Comercio y servicios: Apertura de establecimientos con cita previa para la atención individual de los clientes. Horario preferente para mayores de 65.`);
    agent.add(`- Deporte no profesional: Actividad sin contacto individual y con la protección adecuada (distancia, mascarilla).`);
    agent.add(`- Deporte profesional y federado: Entrenamientos individuales de profesionales y federados. Entrenamiento básico de ligas profesionales.`);
    agent.add(`- Hostelería: Apertura de restaurantes y cafeterías con entrega para llevar. No se permitirá el consumo en el propio local.`);
    agent.add(new Suggestion('Fechas de las etapas de la desescalada'));
    agent.add(new Suggestion('Fase 1'));
  }
  
  function fase1(agent){
    agent.add(`Esta es la fase inicial en la que se podrá llevar a cabo lo siguiente:`);
    agent.add(`- Personal: Contacto social en grupos reducidos para personas no vulnerables ni con patologías previas.`);
    agent.add(`- Comercio y servicios: Apertura del pequeño comercio con aforos limitados y distancias de seguridad.`);
    agent.add(`- Hostelería: Apertura de terrazas con el 30% de las mesas habituales. Podrán ampliarse si los ayuntamientos correspondientes lo permiten.`);
    agent.add(`- Hoteles: Apertura sin uso de zonas comunes y con restricciones en restauración.`);
    agent.add(`- Deporte profesional y federado: Entrenamiento medio en ligas profesionales.`);
    agent.add(`- Deporte no profesional: Deportes sin contacto físico ni uso de vestuarios. Centros al aire libre sin público.`);
    agent.add(`- Ocio: Actos y espectáculos para menos de 30 personas, 200 si son al aire libre. Los museos abrirán con límites de aforo. Bibliotecas`);
    agent.add(`- Lugares de culto: Limitación de un tercio del aforo total.`);
    agent.add(`- Agricultura: Apertura de actividades del sector agroalimentario y pesquero que mantenían restricciones.`);
    agent.add(new Suggestion('Fase 0'));
    agent.add(new Suggestion('Fase 2'));
  }
  
  function fase2(agent){
    agent.add(`Esta es la fase intermedia en la que se podrá llevar a cabo lo siguiente:`);
    agent.add(`- Personal: Se permiten los viajes a segundas residencias siempre que estén en la misma provincia. Bodas con número limitado de asistentes.`);
    agent.add(`- Comercio y servicios: Apertura al público de centros comerciales, prohibiendo la permanencia en las zonas comunes o áreas recreativas.`);
    agent.add(`- Hostelería: Consumo en el local con servicio en mesa con separación entre clientes en mesa y entre mesa. Limitación a un tercio del aforo.`);
    agent.add(`- Hoteles: Apertura de zonas comunes limitadas a un 1/3 de aforo salvo restaurantes y cafeterías, con sus propias restricciones.`);
    agent.add(`- Deporte no profesional: Reanudación de la caza y pesca deportivas.`);
    agent.add(`- Deporte profesional y federado: Entrenamiento básico en ligas no profesionales federadas, y total en ligas profesionales. Partidos a puerta cerrada y transmitidos.`);
    agent.add(`- Ocio: Cines, teatros y auditorios con butaca pre-asignada, con límite de aforo de un tercio. Actividades culturales con menos de 50 personas . Si son al aire libre, menos de 400 personas.`);
    agent.add(`- Lugares de culto: Limitación de la mitad del aforo.`);
    agent.add(`- Educación: Apertura de Infantil hasta 6 años para familias cuyos progenitores trabajan. Abren los centros de educación especial. Selectividad.`);
    agent.add(new Suggestion('Fase 1'));
    agent.add(new Suggestion('Fase 3'));
  }
  
  function fase3(agent){
    agent.add(`Esta es la fase avanzada en la que se podrá llevar a cabo lo siguiente:`);
    agent.add(`- Personal: Contacto social para personas no vulnerables ni con patologías previas.`);
    agent.add(`- Comercio y servicios: Se levanta la prohibición de utilización de las zonas comunes y zonas recreativas de los centros comerciales. Aforo al 50%.`);
    agent.add(`- Hostelería: Se ampliarán los aforos al 50% de la capacidad. Podrán abrir los bares nocturnos y discotecas con un tercio del aforo.`);
    agent.add(`- Hoteles: Las zonas comunes admitirán la mitad de su aforo. Las cafeterías y restaurantes mantendrán las restricciones propias de su sector.`);
    agent.add(`- Ocio: Actos y espectáculos culturales, parques temáticos y de ocio al aire libre de menos de 800 personas, todas sentadas.`);
    agent.add(new Suggestion('Fase 2'));
  }
  
  //Categoría Permisos de conducir
  function puedoConducirConMiPermisoCaducado(agent){
    agent.add(`Los permisos cuyo periodo de vigencia venza durante el estado de alarma quedarán automáticamente prorrogados mientras dure el mismo y hasta sesenta días después de su finalización.`);
    agent.add(new Suggestion('Me estaba sacando un permiso para conducir'));
  }  
  
  function meEstabaSacandoUnPermisoParaConducir(agent){
    agent.add(`No te preocupes. Si  te estabas sacando un permiso el plazo de vigencia que tuvieras para presentarte se verá incrementado por el tiempo en que dure el estado de alarma por lo que no pierdes la convocatoria.`);
    agent.add(`Se prorrogan durante el tiempo que dure el estado de alarma los siguientes plazos: `);
    agent.add(`1.-  El periodo de vigencia de dos años de las pruebas superadas para la obtención de permisos y licencias de conducción.`);
    agent.add(`2.-  El periodo de vigencia de seis meses de las pruebas superadas para la obtención de autorizaciones para la conducción de vehículos que transportan mercancías peligrosas.`);
    agent.add(`3.-  El plazo de seis meses entre convocatorias de un mismo expediente.`);
    agent.add(new Suggestion('¿Puedo conducir con mi permiso caducado?'));
    agent.add(new Suggestion('Soy conductor extranjero'));
  }
  
  function soyConductorExtranjero(agent){
    agent.add(`Podrás seguir conduciendo en las mismas condiciones que antes de que se declarase la situación de alarma.`);
    agent.add(`Además, el tiempo que dure la situación de alarma no cuenta para el plazo de seis meses en el que puedes conducir en España con tu permiso extranjero. De tal manera que el cómputo de los seis meses de plazo se paraliza, reanudándose tan pronto como acabe el estado de alarma. `);
    agent.add(new Suggestion('Me estaba sacando un permiso para conducir'));
  }
  
  //Categoría Vehículos
  function puedoLlevarMiCocheARepararAlTaller(agent){
    agent.add(`Sí, está permitida la apertura de los talleres de reparación y mantenimiento de vehículos a motor así como las actividades complementarias para los vehículos autorizados a circular.`);
    agent.add(`No obstante te recomendamos contactar primero con el taller elegido para asegurarte de su apertura. `);
    agent.add(new Suggestion('¿Qué pasa si me caduca la ITV durante el estado de alarma?'));
  }
  
  function quePasaSiMeCaducaLaITVDuranteElEstadoDeAlarma(agent){
    agent.add(`Si la ITV de tu vehículo ha caducado durante el periodo de estado de alarma , ésta se considerará prorrogada hasta 30 días naturales una vez que finalice el último estado de alarma.`);
    agent.add(`Recuerda además que los centros de ITV estarán cerrados mientras dure el estado de alarma.`);
    agent.add(new Suggestion('¿Puedo llevar mi coche a reparar al taller?'));
    agent.add(new Suggestion('¿Puedo alquilar un vehículo en una compañía de renting?'));
  }
  
  function puedoAlquilarUnVehiculoEnUnaCompañiaDeRenting(agent){
    agent.add(`Si, los establecimientos dedicados al arrendamiento de vehículos sin conductor se mantienen abiertos, aunque recuerda que sólo se permite hacer desplazamientos por vías públicas con ciertas restricciones`);
    agent.add(new Suggestion('¿Qué pasa si me caduca la ITV durante el estado de alarma?'));
  }
  
  //Categoría Circulación
  function cuantosPasajerosPuedenIrEnUnVehiculo(agent){
    agent.add(`El transporte público particular de personas en vehículos de hasta nueve plazas, incluido el conductor, en los que deba viajar más de una persona en el vehículo, respetará que vaya como máximo una persona por cada fila de asientos, manteniéndose la mayor distancia posible entre los ocupantes siempre en el marco de los supuestos de desplazamiento autorizados en el artículo 7 del Real Decreto 463/2020.`);
    agent.add(new Suggestion('¿En qué supuestos puedo circular?')); 
  }
  
  function enQueSupuestosPuedoCircular(agent){
    agent.add(`En general está prohibido circular por las vías públicas durante el periodo que dure el estado de alarma. Únicamente se puede circular si es para realizar alguna de las siguientes actividades: `);
    agent.add(`1.- Adquisición de alimentos, productos farmacéuticos y de primera necesidad.`);
    agent.add(`2.- Asistencia a centros, servicios y establecimientos sanitarios.`);
    agent.add(`3.- Desplazamiento al lugar de trabajo para efectuar su prestación laboral, profesional o empresarial.`);
    agent.add(`4.- Retorno al lugar de residencia habitual.`);
    agent.add(`5.- Asistencia y cuidado a mayores, menores, dependientes, personas con discapacidad o personas especialmente vulnerables.`);
    agent.add(`6.- Desplazamiento a entidades financieras y de seguros.`);
    agent.add(`7.- Por causa de fuerza mayor o situación de necesidad.`);
    agent.add(`Cualquier otra actividad de análoga naturaleza que habrá de hacerse individualmente, salvo que se acompañe a personas con discapacidad o por otra causa justificada.`);
    agent.add(new Suggestion('¿Cuántos pasajeros pueden ir en un vehículo?'));
    agent.add(new Suggestion('¿Qué vehículos pueden circular durante el estado de alarma?'));
  }  
  
  function queVehiculosPuedenCircularDuranteElEstadoDeAlarma(agent){
    agent.add(`Hay vehículos que por su naturaleza es necesario que sigan dando servicio durante este periodo excepcional que vivimos. Estos vehículos podrán circular sin la limitación a la que se ven sometidos el resto.`);
    agent.add(`Tienen permiso para su libre circulación los siguientes tipos de vehículos: `);
    agent.add(`a) Los de transporte sanitario y asistencia sanitaria, pública o privada, los de las Fuerzas y Cuerpos de Seguridad, los de protección civil y salvamento y los de extinción de incendios.`);
    agent.add(`b) Los que transporten a personal de mantenimiento o técnicos de reparación de instalaciones o equipamientos sanitarios`);
    agent.add(`c) Los de distribución de medicamentos y material sanitario.`);
    agent.add(`d) Los destinados a la distribución de alimentos.`);
    agent.add(`e) Los de las Fuerzas Armadas.`);
    agent.add(`f) Los de auxilio en carretera.`);
    agent.add(`g) Los de los servicios de conservación y mantenimiento de carreteras.`);
    agent.add(`h) Los de recogida de residuos sólidos urbanos.`);
    agent.add(`i) Los destinados al transporte de materiales fundentes.`);
    agent.add(`j) Los destinados al transporte de combustibles.`);
    agent.add(`k) Los destinados a la producción, comercialización, transformación y distribución de productos agrícolas, ganaderos y pesqueros, y sus insumos; a la producción, distribución alquiler y reparación de equipos y maquinaria para la agricultura, la pesca, la ganadería, y su industria asociada, y al transporte y tratamiento de residuos y subproductos agrícolas, ganaderos y pesqueros, y de la industria alimentaria.`);
    agent.add(`l) Los destinados al transporte de mercancías perecederas, entendiendo como tales las recogidas en el anejo 3 del Acuerdo Internacional sobre el transporte de mercancías perecederas (ATP) así como las frutas y verduras frescas, en vehículos que satisfagan las definiciones y normas expresadas en el anejo 1 del ATP. En todo caso, la mercancía perecedera deberá suponer al menos la mitad de la capacidad de carga útil del vehículo u ocupar la mitad del volumen de carga útil del vehículo.`);
    agent.add(`m) Los destinados a la fabricación y distribución de productos de limpieza e higiene.`);
    agent.add(`n) Los de la Sociedad Estatal Correos y Telégrafos, S.A.`);
    agent.add(`o) Los fúnebres.`);
    agent.add(`p) Los utilizados por las empresas de seguridad privada para la prestación de servicios de transporte de seguridad, de respuesta ante alarmas, de ronda o vigilancia discontinua, y aquellos que resulte preciso utilizar para el desempeño de servicios de seguridad en garantía de los servicios esenciales y el abastecimiento a la población.`);
    agent.add(`q) Otros vehículos que, no estando incluidos entre los anteriores, los agentes encargados del control y disciplina del tráfico consideren, en cada caso concreto, que contribuyen a garantizar el suministro de bienes o la prestación de servicios esenciales para la población. `);
    agent.add(new Suggestion('¿En qué supuestos puedo circular?'));
    agent.add(new Suggestion('¿Pueden circular los transportes de mercancias?'));
  }
  
  function puedenCircularLosTransportesDeMercancias(agent){
    agent.add(`Sí, por motivo del estado excepcional que vivimos, se suspenden temporalmente y mientras dure el estado de alarma las restricciones a la circulación para el transporte de mercancías.`);
    agent.add(`Concretamente se suspenden las restricciones a:`);
    agent.add(`1.- Transporte de mercancías en general, cuya masa máxima autorizada exceda los 7.500 kg.`);
    agent.add(`2.- EL transporte de mercancías peligrosas.`);
    agent.add(`3.- Los vehículos especiales que por sus características técnicas o por razón de la carga indivisible transportada, superan los valores de las masas o dimensiones máximas permitidas.`);
    agent.add(new Suggestion('¿Qué vehículos pueden circular durante el estado de alarma?'));
  }
    
  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Comienzo', comienzo);
  
  //Categorías
  intentMap.set('Salidas Autorizadas', salidas);
  intentMap.set('Otros', otros);
  intentMap.set('Prevencion', prevencion);
  intentMap.set('Sintomas', sintomas);
  intentMap.set('Informacion General', general);
  intentMap.set('Permisos de conducir', permisosDeConducir);
  intentMap.set('Vehiculos', vehiculos);
  intentMap.set('Circulacion', circulacion);
  
  //Categoría Otros
  intentMap.set('Otros - ¿Quien corre mas riesgo?', quienCorreMasRiesgo);
  intentMap.set('Otros - ¿Debo preocuparme?', deboPreocuparme);
  intentMap.set('Otros - ¿Puede mi mascota contagiarme?', puedeMiMascotaContagiarme);
  
  //Categoría Prevención
  intentMap.set('Prevencion - ¿Como protegerse?', comoProtegerse);
  intentMap.set('Prevencion - ¿Como comprar con seguridad en una tienda?', comoComprarConSeguridadEnUnaTienda);
  intentMap.set('Prevencion - ¿Como se propaga el coronavirus?', comoSePropagaElCoronavirus);
  intentMap.set('Prevencion - ¿Como usar la mascarilla?', comoUsarLaMascarilla);
  intentMap.set('Prevencion - ¿Debo llevar mascarilla?', deboLlevarMascarilla);
  intentMap.set('Prevencion - ¿Hay algo que no deba hacer?', hayAlgoQueNoDebaHacer);
  intentMap.set('Prevencion - ¿Son eficaces los antibioticos?', sonEficacesLosAntibioticos);
  
  //Categoría Síntomas
  intentMap.set('Sintomas - ¿Cuales son los sintomas?', cualesSonLosSintomas);
  intentMap.set('Sintomas - ¿Cuanto dura el periodo de incubacion?', cuantoDuraElPeriodoDeIncubacion);
  
  //Categoría Información General
  intentMap.set('Informacion General - ¿Cual es la fuente del coronavirus?', cualEsLaFuenteDelCoronavirus);
  intentMap.set('Informacion General - ¿Cuanto tiempo sobrevive el coronavirus en la superficie?', cuantoTiempoSobreviveElCoronavirusEnLaSuperficie);
  intentMap.set('Informacion General - ¿Existe alguna vacuna?', existeAlgunaVacuna);
  intentMap.set('Informacion General - ¿Que es el coronavirus?', queEsElCoronavirus);
  intentMap.set('Informacion General - ¿Que probabilidad hay de contagiarse?', queProbabilidadHayDeContagiarse);
  
  //Categoría Salidas Autorizadas
  intentMap.set('Salidas Autorizadas - Horarios de salida', horariosDeSalida);
  intentMap.set('Salidas Autorizadas - Fechas de las etapas de la desescalada', fechasDeLasEtapasDeLaDesescalada);
  intentMap.set('Salidas Autorizadas - Fase 0', fase0);
  intentMap.set('Salidas Autorizadas - Fase 1', fase1);
  intentMap.set('Salidas Autorizadas - Fase 2', fase2);
  intentMap.set('Salidas Autorizadas - Fase 3', fase3);
  
   //Categoría Permisos de conducir
  intentMap.set('Permisos de conducir - ¿Puedo conducir con mi permiso caducado?', puedoConducirConMiPermisoCaducado);
  intentMap.set('Permisos de conducir - Me estaba sacando un permiso para conducir', meEstabaSacandoUnPermisoParaConducir);
  intentMap.set('Permisos de conducir - Soy conductor extranjero', soyConductorExtranjero);
  
  //Categoría Vehículos
  intentMap.set('Vehiculos - ¿Puedo alquilar un vehiculo en una compañia de renting?', puedoAlquilarUnVehiculoEnUnaCompañiaDeRenting);
  intentMap.set('Vehiculos - ¿Puedo llevar mi coche a reparar al taller?', puedoLlevarMiCocheARepararAlTaller);
  intentMap.set('Vehiculos - ¿Que pasa si me caduca la ITV durante el estado de alarma?', quePasaSiMeCaducaLaITVDuranteElEstadoDeAlarma);
  
  //Categoría Circulación
  intentMap.set('Circulacion - ¿Cuantos pasajeros pueden ir en un vehiculo?', cuantosPasajerosPuedenIrEnUnVehiculo);
  intentMap.set('Circulacion - ¿En que supuestos puedo circular?', enQueSupuestosPuedoCircular);
  intentMap.set('Circulacion - ¿Que vehiculos pueden circular durante el estado de alarma?', queVehiculosPuedenCircularDuranteElEstadoDeAlarma);
  intentMap.set('Circulacion - ¿Pueden circular los transportes de mercancias?', puedenCircularLosTransportesDeMercancias);
  
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
