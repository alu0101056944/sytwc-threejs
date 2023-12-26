export const modelInnerHTML = `
<div>
  <h1>Estructura de los Datos</h1>

  <h2>Dimensiones</h2>

  <h3>Employee</h3>
  <ul>
      <li>Employee id.</li>
      <li>Name</li>
      <li>Title</li>
      <li>Department</li>
  </ul>

  <h3>Tool</h3>
  <ul>
      <li>Tool id.</li>
      <li>Name</li>
      <li>AuthorCompany</li>
      <li>Type</li>
      <li>Specialization</li>
  </ul>

  <h3>Date</h3>
  <ul>
      <li>Date id.</li>
      <li>Date</li>
  </ul>

  <h3>Community</h3>
  <ul>
      <li>Community id.</li>
      <li>Name</li>
      <li>Type</li>
  </ul>

  <h3>Company</h3>
  <ul>
      <li>Company id.</li>
      <li>Name</li>
      <li>EmployeeAmount</li>
      <li>AmountOfSearches</li>
  </ul>

  <h3>Project</h3>
  <ul>
      <li>Project id.</li>
      <li>Project name</li>
      <li>AmountOfContributors</li>
      <li>Downloads</li>
      <li>Searches</li>
  </ul>

  <h3>Market</h3>
  <ul>
      <li>Market id.</li>
  </ul>

  <h2>Mapa Dato - Tabla</h2>
  <h3>Nivel de experiencia del equipo</h3>

  <p>Años de experiencia.</p>

  <h3>Employee - Tool</h3>
  <p>Valoración de usuarios de la facilidad de aprendizaje de una herramienta.</p>

  <h3>Tool</h3>
  <p>Existencia de otras tecnologías</p>

  <p>Desarrollo tecnológico de las herramientas y librerías</p>

  <p>número de búsquedas</p>

  <h3>Tool - Date</h3>
  <p>número de bugs pendientes por resolver.</p>

  <h3>Community - Tool</h3>
  <p>n.º de contribuciones (código abierto) que el proyecto recibe.</p>

  <h3>Community - Tool</h3>
  <p>Apoyo de comunidad de las herramientas y librerías</p>

  <p>n.º y calidad de discusiones en internet.</p>

  <h3>community - tool - date</h3>
  <p>nivel de documentación.</p>

  <h3>community - tool</h3>
  <p>n.º de empresas que utilizan o apoyan la tecnología.</p>

  <h3>Tool - Project - Company</h3>
  <p>Valoración de herramienta en un ranking de herramientas.</p>

  <h3>Community - Tool - Date</h3>
  <p>Costes de licencias</p>

  <p>¿Es código abierto?</p>

  <h3>Tool</h3>
  <p>¿De pago?</p>

  <h3>Tool</h3>
  <p>¿Pago periodico o solo una vez?</p>

  <h3>Tool</h3>
  <p>Coste monetario.</p>

  <h3>Tool</h3>
  <p>Niveles de éxito de proyectos que utilizan la herramienta.</p>

  <h3>Company - Date</h3>
  <p>Beneficios cuatrimestrales de la empresa.</p>

  <h3>Company</h3>
  <p>Nivel de importancia de la empresa que la utiliza en la industria (efecto de la reputación, cómo de popular es).</p>

  <h3>Tool - project - company</h3>
  <p>Cantidad de proyectos que utilizan la herramienta.</p>

  <h3>Project</h3>
  <p>Número de descargas. (nivel de éxito de proyecto)</p>

  <h3>Project</h3>
  <p>Número de búsquedas.</p>

  <h3>Tool</h3>
  <p>Niveles de éxito de la herramienta.</p>

  <p>Número de descargas.</p>

  <h3>Tool</h3>
  <p>Número de búsquedas</p>

  <h3>Tool</h3>
  <p>Mercado</p>

  <p>Nº de menciones de tecnología en ofertas de trabajo.</p>

  <h3>Market - Tool - Date</h3>
  <p>N.º de ofertas de trabajo.</p>

  <h3>Market - Date</h3>
  <p>Facts</p>

  <h3>Employee - Tool</h3>
  <ul>
      <li>Employee id.</li>
      <li>Tool id.</li>
      <li>YearsOfExperience</li>
  </ul>

  <h3>Project - Tool</h3>
  <ul>
      <li>Project id.</li>
      <li>Tool id.</li>
  </ul>

  <h3>Project - Company</h3>
  <ul>
      <li>Project id.</li>
      <li>Company id.</li>
      <li>AmountOfEmployeesAssigned</li>
  </ul>

  <h3>Tool - Date</h3>
  <ul>
      <li>Tool id.</li>
      <li>Date</li>
      <li>Versión</li>
      <li>Nivel de interés</li>
      <li>TipoDeCambio</li>
  </ul>

  <h3>Community - Tool</h3>
  <ul>
      <li>Community Id.</li>
      <li>Tool id.</li>
      <li>AmountOfBugsReported</li>
      <li>AmounOfBugsSolved</li>
      <li>AmountOfChangesCommited</li>
      <li>AmountOfDiscussions</li>
  </ul>

  <h3>Tool - Project - Company</h3>
  <ul>
      <li>Tool id.</li>
      <li>Project id.</li>
      <li>Company id.</li>
  </ul>

  <h3>Community - Tool - Date</h3>
  <ul>
      <li>Community id.</li>
      <li>Tool id.</li>
      <li>Date id.</li>
      <li>Valoración(0-10)</li>
      <li>PuestoEnRanking</li>
  </ul>

  <h3>Company - Date</h3>
  <ul>
      <li>Company id.</li>
      <li>Year</li>
      <li>Quarter</li>
      <li>Benefit</li>
  </ul>

  <h3>Market - Date</h3>
  <ul>
      <li>Market id.</li>
      <li>Date id.</li>
      <li>TotalAmountOfOffers</li>
  </ul>

  <p>(...)</p>
</div>
`;