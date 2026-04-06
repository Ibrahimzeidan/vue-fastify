<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="app-header-inner">
        <div>
          <p class="eyebrow"></p>
          <h1>Task Manager</h1>
          <p class="subtitle">Track your tasks in a cleaner, calmer workflow.</p>
        </div>

        <nav class="app-nav">
          <RouterLink to="/tasks">Tasks</RouterLink>
        </nav>
      </div>
    </header>

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style>
:root {
  --navy-950: #071526;
  --navy-900: #0d2340;
  --navy-800: #16345c;
  --navy-700: #234a7d;
  --sky-50: #f4f9ff;
  --sky-100: #e7f1ff;
  --sky-200: #d3e6ff;
  --sky-300: #b8d5ff;
  --sky-400: #7db5ff;
  --sky-500: #4a97ff;
  --ink-900: #10233d;
  --ink-700: #4d6481;
}

body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
  background:
    radial-gradient(circle at top left, rgba(125, 181, 255, 0.22), transparent 28%),
    radial-gradient(circle at top right, rgba(74, 151, 255, 0.18), transparent 24%),
    linear-gradient(180deg, var(--navy-950) 0%, var(--navy-900) 30%, #eff6ff 30%, #f8fbff 100%);
  color: var(--ink-900);
}

* {
  box-sizing: border-box;
}

button,
input {
  font: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

.app-shell {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.app-shell::before,
.app-shell::after {
  content: '';
  position: absolute;
  border-radius: 999px;
  filter: blur(10px);
  pointer-events: none;
}

.app-shell::before {
  width: 360px;
  height: 360px;
  top: -120px;
  right: -80px;
  background: rgba(125, 181, 255, 0.18);
}

.app-shell::after {
  width: 280px;
  height: 280px;
  top: 220px;
  left: -120px;
  background: rgba(74, 151, 255, 0.14);
}

.app-header {
  position: relative;
  z-index: 1;
}

.app-header-inner {
  max-width: 1080px;
  margin: 24px auto 0;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  border: 1px solid rgba(183, 214, 255, 0.22);
  border-radius: 22px;
  background: linear-gradient(135deg, rgba(10, 27, 50, 0.92), rgba(24, 56, 96, 0.82));
  backdrop-filter: blur(18px);
  box-shadow: 0 24px 60px rgba(4, 13, 24, 0.22);
}

.app-header h1 {
  margin: 4px 0 6px;
  color: #ffffff;
  font-size: clamp(2rem, 3vw, 2.8rem);
  letter-spacing: -0.04em;
}

.eyebrow {
  margin: 0;
  color: var(--sky-300);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.24em;
}

.subtitle {
  margin: 0;
  color: rgba(231, 241, 255, 0.82);
  font-size: 1rem;
}

.app-nav a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 116px;
  padding: 12px 18px;
  border: 1px solid rgba(183, 214, 255, 0.28);
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(243, 249, 255, 0.18), rgba(125, 181, 255, 0.22));
  color: #ffffff;
  font-weight: bold;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
  transition: transform 0.2s ease, background 0.2s ease;
}

.app-nav a:hover {
  transform: translateY(-1px);
  background: linear-gradient(135deg, rgba(243, 249, 255, 0.26), rgba(125, 181, 255, 0.28));
}

.app-nav a.router-link-active {
  color: var(--navy-900);
  background: linear-gradient(135deg, #f4f9ff, var(--sky-200));
}

.app-main {
  position: relative;
  z-index: 1;
  padding: 40px 24px 56px;
}

@media (max-width: 768px) {
  .app-header-inner {
    margin-top: 16px;
    padding: 18px;
    flex-direction: column;
    align-items: flex-start;
  }

  .app-nav {
    width: 100%;
  }

  .app-nav a {
    width: 100%;
  }

  .app-main {
    padding: 28px 16px 40px;
  }
}
</style>
