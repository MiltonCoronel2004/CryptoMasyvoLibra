"use client"
// Esto es un Client Component
// En nextjs si el componente tiene "use client" al principio es como decirle "usa react".
// Ninguna funcionalidad de nextjs esta disponible
// La idea es separarlo
// Cliente siempre hace referencia al front, cliente = front

export default function DashboardClient({texto}) {
  return <div>{texto}</div>;
}
