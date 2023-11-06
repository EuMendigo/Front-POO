import React from "react";
import { Routes as SwitchRoutes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/Homepage/HomePage";
import Cardapio from "../pages/Cardapio/Cardapio";
import Avaliacoes from "../pages/Avaliacoes/Avaliacoes";
import Localizacao from "../pages/Localizacao/Localizacao";

export const PublicRoutes: React.FC = () => {

    return (
        <SwitchRoutes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cardapio" element={<Cardapio />} />
            <Route path="/localizacao" element={<Localizacao />} />
            <Route path="/avaliacoes" element={<Avaliacoes />} />
        </SwitchRoutes>
    );
};