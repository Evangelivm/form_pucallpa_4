"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react"; // Puedes usar cualquier ícono de éxito
import { useTransaction } from "../context/TransactionContext";
import Image from "next/image";

function Success() {
  const { transactionData } = useTransaction();
  return (
    <>
      <main className="p-4 md:p-20">
        <Card className="mx-auto md:p-2 md:max-w-5xl sm:max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Inscripci&oacute;n Finalizada
            </CardTitle>
            <CardDescription className="text-md text-center">
              Su información ha sido registrada exitosamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 text-center">
              {/* Icono de éxito */}
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />

              {/* Mensaje de confirmación */}
              <p className="text-lg font-semibold">¡Gracias por inscribirse!</p>
              <p className="text-md">
                Revise su correo para obtener{" "}
                <b>
                  la confirmaci&oacute;n de su inscripci&oacute;n y
                  c&oacute;digo QR
                </b>
                , el cual necesitar&aacute; en el <b>ingreso del evento</b>.
              </p>

              {/* Resumen de información opcional */}
              <div className="bg-gray-100 p-4 rounded-lg text-left">
                <p className="text-sm">
                  <strong>Evento:</strong> Foro Nacional - Reactivación
                  Petrolera
                </p>
                <p className="text-sm">
                  <strong>Fecha:</strong> 18 de Octubre de 2024
                </p>
                <p className="text-sm">
                  <strong>Lugar:</strong> Hotel Costa del Sol, Pucallpa
                </p>
                <p className="text-sm">
                  <strong>C&oacute;digo:</strong> {transactionData}
                </p>
              </div>
              <div className="grid justify-items-center">
                <Image
                  src={`https://quickchart.io/qr?text=${encodeURIComponent(
                    transactionData
                  )}&ecLevel=Q&size=200&format=png&margin=1`}
                  alt="Código QR de Confirmación"
                  width={200}
                  height={200}
                />
              </div>
              {/* Botones de acción */}
              <div className="mt-6">
                <Button
                  className="w-full mb-2"
                  onClick={() =>
                    (window.location.href = "https://reactivapetrol.online/")
                  }
                >
                  Volver al Inicio
                </Button>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => window.print()}
                >
                  Imprimir Confirmación y QR
                </Button>
              </div>

              {/* Enlace a más detalles */}
              <p className="mt-4 text-sm text-gray-500">
                Para más detalles, visita la{" "}
                <a
                  href="https://reactivapetrol.online/#schedule"
                  className="text-green-500 underline"
                >
                  página de eventos
                </a>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

export default Success;
