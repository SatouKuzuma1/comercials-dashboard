import * as React from "react";

interface EmailTemplateProps {
  name: string;
  text: string;
  subject: string;
  senderName: string;
}

export const ComercialEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  text,
  subject,
  senderName,
}) => (
  <div>
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>¡Hola {name}!</h2>
      <p style={{ color: "#555" }}>
        Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en
        contacto contigo lo antes posible.
      </p>
      <div
        style={{
          backgroundColor: "#f4f4f4",
          padding: "10px",
          borderRadius: "5px",
          margin: "20px 0",
        }}
      >
        <h3 style={{ color: "#333", marginBottom: "10px" }}>
          Detalles del mensaje:
        </h3>
        <p>
          <strong>Asunto:</strong> {subject}
        </p>
        <p>
          <strong>Mensaje:</strong> {text}
        </p>
      </div>
      <p style={{ color: "#555" }}>
        Atentamente,
        <br />
        El equipo de {senderName}
      </p>
    </div>
  </div>
);
