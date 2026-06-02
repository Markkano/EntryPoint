# EntryPoint

A lightweight self-hosted dashboard for accessing your personal services, homelab applications and external tools.

Built with SvelteKit, TailwindCSS and Docker.

---

## Features

* Responsive dashboard UI
* Minimalist dark theme
* Categorized and uncategorized services
* JSON-based configuration
* Optional icons and descriptions
* Optional same-tab navigation
* Docker-ready
* Persistent configuration
* Runtime-served custom icons
* No database required
* No authentication
* Simple and fast setup

---

## Preview

EntryPoint is designed to work as a personal launcher for:

* Self-hosted applications
* Docker services
* NAS tools
* Monitoring stacks
* External developer tools
* Local network resources

Examples:

* Grafana
* Portainer
* Home Assistant
* phpMyAdmin
* MinIO
* Redis Insight
* Gitea
* Jellyfin
* Nextcloud
* IT Tools

---

## Tech Stack

* SvelteKit
* TailwindCSS
* TypeScript
* Docker
* Docker Compose

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Markkano/EntryPoint.git
cd EntryPoint
```

---

## Run with Docker

```bash
docker compose up --build -d
```

The dashboard will be available at:

```text
http://localhost
```

---

## Configuration

Services are configured using:

```text
config/services.json
```

On first startup, EntryPoint automatically creates the file from:

```text
config/services.example.json
```

---

## Example Configuration

```json
{
  "services": [
    {
      "name": "Grafana",
      "url": "http://grafana.local"
    }
  ],
  "categories": [
    {
      "name": "Databases",
      "services": [
        {
          "name": "phpMyAdmin",
          "url": "http://phpmyadmin.local",
          "description": "MySQL administration"
        }
      ]
    }
  ]
}
```

---

## Service Properties

### Minimal service

```json
{
  "name": "Grafana",
  "url": "http://grafana.local"
}
```

### Full example

```json
{
  "name": "Grafana",
  "url": "http://grafana.local",
  "description": "Monitoring dashboard",
  "icon": "/icons/grafana.png",
  "status_check": true,
  "same_tab": true
}
```

---

## Icons

Icons can be:

* Local runtime icons
* Static bundled icons
* External URLs

### Runtime icons

Place uploaded/custom icons in:

```text
data/icons
```

And reference them as:

```json
{
  "icon": "/icons/grafana.png"
}
```

---

## Docker Volumes

The following folders are persisted:

```yaml
volumes:
  - ./config:/app/config
  - ./data:/app/data
```

This allows:

* Persistent configuration
* Persistent uploaded icons
* Easy backups
* Easy migration between servers

---

## Development

Run locally:

```bash
npm install
npm run dev -- --host
```

Default development URL:

```text
http://localhost:5173
```

---

## Planned Features

* Online status checks
* Config hot reload
* Drag & drop reordering
* Add/Edit services from UI
* Categories management
* Upload icons from UI
* TCP ping
* Import / Export configuration

---

## Philosophy

EntryPoint is intentionally simple.

The goal is to provide:

* A clean self-hosted dashboard
* Minimal setup
* Human-readable configuration
* Easy portability
* No unnecessary complexity

## About This Project

EntryPoint is primarily a personal learning project.

I'm building it to:

* Learn and improve with SvelteKit
* Experiment with frontend architecture and UI design
* Practice Docker-based deployments
* Build tools that are actually useful in my homelab

The project intentionally keeps things simple and lightweight while evolving incrementally over time.
