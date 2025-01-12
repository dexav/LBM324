# Base Image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy dependencies file to container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["python", "app.py"]
