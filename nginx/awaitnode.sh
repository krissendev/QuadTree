#!/bin/sh
echo "Waiting for Node.js to start on port 3000..."

TIMEOUT=30
ELAPSED=0

while ! nc -z 127.0.0.1 3000; do
  if [ $ELAPSED -ge $TIMEOUT ]; then
    echo "ERROR: Node.js failed to start within $TIMEOUT seconds"
    exit 1
  fi
  
  # Log every 5 seconds to reduce noise
  if [ $((ELAPSED % 5)) -eq 0 ]; then
    echo "Waited $ELAPSED seconds of timeout limit $TIMEOUT seconds..."
  fi
  
  sleep 1
  ELAPSED=$((ELAPSED + 1))
done

echo "Node.js is ready! (Started after $ELAPSED seconds)"
exec "$@"
