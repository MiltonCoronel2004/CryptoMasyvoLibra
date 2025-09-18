import DashboardClient from "./DahboardClient";

export default async function DashboardPage() {
  // En un server component como este no se puede utilizar react
  // Aqui se pueden hacer consultas al back y en el front no hay que esperar que cargen
  const texto = () => {
    return "Hola";
  };

  const saludo = texto();

  // Aca se le pasan props al componente tipo cliente, tal cual como en react
  // T
  return <DashboardClient texto={saludo} />;
}

// Si ven la estructura de carpetas, las rutas se definen en app/ cada carpeta dentro de app representa una ruta, por ejemplo la carpeta dashboard genera la url /dashboard. Siempre debe tener un server component llamado page.jsx, y como la idea es aprovechar react, en el sv component retornamos un client componente que puede llamarse como sea, en lo personal para diferenciar le pongo Nombre de Ruta + Client, DashboardClient.
