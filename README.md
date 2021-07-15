# Pi-Mon
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Create `config.json` in the root directory
```bash
touch config.json
```

Add config for each provider to monitor
```json
# Provider
{
  name: "",
  enabled: true,
  params: {
    host: "",
    ...
  }
}
```

## Deployment
### Docker
Starts project on port 5000
```bash
docker build -t client . && docker run --name pi-mon -p 0.0.0.0:5000:3000 client
```