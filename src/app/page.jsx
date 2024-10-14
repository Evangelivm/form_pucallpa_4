"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Steps from "./steps";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "./valid/userSchema";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTransaction } from "./context/TransactionContext";
import {
  Loader2,
  Monitor,
  MicVocal,
  LogIn,
  BarChart,
  Hammer,
} from "lucide-react";

function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { setTransactionData } = useTransaction();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });
  const [cityOptions, setCityOptions] = useState([]);
  const [tipoStaff, setTipoStaff] = useState();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };
  // useEffect(() => {
  //   console.log("Progress phase:", progress);
  // }, [progress]); // Se ejecutará cada vez que cambie 'progress'
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.error("Hay errores en el formulario");
    }
  }, [errors]);
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    //console.log("Formulario enviado con datos:", data); // Verifica los datos del formulario
    try {
      // Crear una instancia de FormData
      const formData = new FormData();
      formData.append("nombre", data.nombre);
      formData.append("apellido", data.apellido);
      formData.append("email", data.email);
      formData.append("dni", data.dni);
      formData.append("telefono", data.tel);
      formData.append("tipo_staff", data.tipo_staff);
      // Enviar datos al servidor
      const response = await axios.post("/api/sendInfo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //console.log("Datos enviados con éxito:", response.data);
      // Manejo de respuesta o notificación de éxito
      //toast.success("Registro exitoso");
      if (response.data && response.data.result) {
        setTransactionData(response.data.result);
        setIsSubmitting(false);
        router.push("/success");
      } else {
        console.error("Error: No se recibió 'result' en la respuesta.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Manejo de error o notificación
      toast.error("Error al enviar los datos");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="p-4">
      <Toaster richColors position="top-center" />
      <Card className="mx-auto md:p-2 md:max-w-5xl sm:max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Registro Staff</CardTitle>
          <CardDescription>
            Ingrese su informaci&oacute;n de registro para inscribirse
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <Label htmlFor="nombre" className="text-md">
                {progress === 0 && "Paso 1: Datos Personales"}
                {progress === 1 && "Paso 2: Tipo de Staff"}
              </Label>

              <Steps
                number={progress === 0 ? 50 : progress === 1 ? 100 : null}
              />

              {/* primera seccion */}
              {progress === 0 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="nombre">Nombres</Label>
                      <Input
                        id="nombre"
                        placeholder="Juan"
                        required
                        {...register("nombre")}
                      />
                      {errors.nombre?.message && (
                        <p className="text-xs text-red-600 px-2">
                          {errors.nombre?.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="apellido">Apellidos</Label>
                      <Input
                        id="apellido"
                        placeholder="Perez"
                        required
                        {...register("apellido")}
                      />
                      {errors.apellido?.message && (
                        <p className="text-xs text-red-600 px-2">
                          {errors.apellido?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:gap-2 md:grid-cols-3 md:gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Correo Electr&oacute;nico</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@ejemplo.com"
                        required
                        {...register("email")}
                      />
                      {errors.email?.message && (
                        <p className="text-xs text-red-600 px-2">
                          {errors.email?.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dni">DNI/CE</Label>
                      <Input
                        id="dni"
                        type="number"
                        placeholder="DNI o Carnet de Extranjer&iacute;a"
                        required
                        {...register("dni")}
                      />
                      {errors.dni?.message && (
                        <p className="text-xs text-red-600 px-2">
                          {errors.dni?.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tel">Celular</Label>
                      <Input
                        id="tel"
                        type="tel"
                        placeholder="Ingrese n&uacute;mero de tel&eacute;fono"
                        required
                        {...register("tel")}
                      />
                      {errors.tel?.message && (
                        <p className="text-xs text-red-600 px-2">
                          {errors.tel?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* segunda seccion */}
              {progress === 1 && (
                <>
                  <div className="grid gap-4 sm:gap-2 md:grid-cols-2 md:gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="tipo_staff">Usted es:</Label>
                      <Controller
                        name="tipo_staff"
                        control={control}
                        defaultValue=""
                        render={({ field: { value, onChange } }) => (
                          <Select
                            value={value}
                            onValueChange={(newValue) => {
                              onChange(newValue);
                              setTipoStaff(newValue); // Actualizar estado
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione una opcion" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sistema">
                                <div className="flex items-center">
                                  <Monitor
                                    className="w-4 h-4 mr-2"
                                    color="#13d84e"
                                  />
                                  Sistema
                                </div>
                              </SelectItem>
                              <SelectItem value="expositor">
                                <div className="flex items-center">
                                  <MicVocal
                                    className="w-4 h-4 mr-2"
                                    color="#5fb4ae"
                                  />
                                  Expositor
                                </div>
                              </SelectItem>
                              <SelectItem value="equip log">
                                <div className="flex items-center">
                                  <LogIn
                                    className="w-4 h-4 mr-2"
                                    color="#9a2bb1"
                                  />
                                  Equipo Logístico
                                </div>
                              </SelectItem>
                              <SelectItem value="contador">
                                <div className="flex items-center">
                                  <BarChart
                                    className="w-4 h-4 mr-2"
                                    color="#ff9800"
                                  />
                                  Contador
                                </div>
                              </SelectItem>
                              <SelectItem value="apoyo tecnico">
                                <div className="flex items-center">
                                  <Hammer
                                    className="w-4 h-4 mr-2"
                                    color="#03a9f4"
                                  />
                                  Apoyo Técnico
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.tipo_staff && (
                        <p className="text-xs text-red-600 px-2">
                          {errors.tipo_staff.message}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-center">
                {progress > 0 && (
                  <>
                    <Button
                      className="w-full mt-4 md:w-1/4 mr-2 bg-gray-400 hover:bg-gray-300 text-gray-800"
                      type="button"
                      onClick={() => {
                        setProgress((prevProgress) => prevProgress - 1);
                      }}
                    >
                      Antes
                    </Button>
                  </>
                )}
                {progress === 1 && (
                  <>
                    <Button
                      type="submit"
                      className="w-full mt-4 md:w-1/4 mr-2 bg-green-700 hover:bg-green-600 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando
                        </>
                      ) : (
                        <>Registrar</>
                      )}
                    </Button>
                  </>
                )}
                {progress < 1 && (
                  <>
                    <Button
                      className="w-full mt-4 md:w-1/4 bg-gray-600 hover:bg-gray-500 text-white"
                      type="button"
                      onClick={() => {
                        setProgress((prevProgress) => prevProgress + 1);
                      }}
                    >
                      Siguiente
                    </Button>
                  </>
                )}
                {/* <div>{JSON.stringify(watch(errors), null, 2)}</div> */}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default LoginForm;
