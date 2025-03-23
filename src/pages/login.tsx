import React from "react";
import { Card, CardBody, CardHeader, Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = React.useState({
    username: "",
    password: ""
  });

  const validateForm = () => {
    const newErrors = {
      username: "",
      password: ""
    };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Add your authentication logic here
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-4 pb-8 pt-6">
          <Icon icon="lucide:glasses" className="text-5xl text-primary" />
          <h1 className="text-2xl font-bold text-foreground">
            Bienvenue dans OpticManager
          </h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Nom d'utilisateur"
              placeholder="Entrez votre nom d'utilisateur"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              errorMessage={errors.username}
              isInvalid={!!errors.username}
              startContent={<Icon icon="lucide:user" />}
            />
            <Input
              label="Mot de passe"
              placeholder="Entrez votre mot de passe"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              errorMessage={errors.password}
              isInvalid={!!errors.password}
              startContent={<Icon icon="lucide:lock" />}
            />
            <Button 
              type="submit" 
              color="primary" 
              className="mt-4"
              size="lg"
            >
              Se connecter
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}