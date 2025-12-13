// js/login.js
// Login com Supabase (PRODUÇÃO)

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// ⚠️ Idealmente mover para variáveis de ambiente
const SUPABASE_URL = "https://njgxfeemwybiuzoymdhw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qZ3hmZWVtd3liaXV6b3ltZGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTI4OTAsImV4cCI6MjA4MDQyODg5MH0.-eldoV3CvMp0QmwuDxCFPjr4ztwJ1wZp4pB6ZP2TJJU";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-login');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = "A entrar...";

    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value;

    // 🔎 Validações básicas
    if (!email || !password) {
      alert("Email e palavra-passe são obrigatórios.");
      resetButton(button);
      return;
    }

    if (!validateEmail(email)) {
      alert("Introduza um email válido.");
      resetButton(button);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        alert("Falha no login. Verifique o email, a palavra-passe e se confirmou o email.");
        console.error(error);
        resetButton(button);
        return;
      }

      // 🔐 Sessão criada com sucesso
      if (data.session) {
        window.location.href = "dashboard.html";
      }

    } catch (err) {
      console.error("Erro inesperado:", err);
      alert("Erro de comunicação. Tente novamente.");
      resetButton(button);
    }
  });
});

// ======================
// Funções auxiliares
// ======================

function resetButton(button) {
  button.disabled = false;
  button.textContent = "Entrar";
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
