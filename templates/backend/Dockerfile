# Use the official, lightweight Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the default Streamlit port
EXPOSE 7777

# Command to run the Streamlit application
CMD ["streamlit", "run", "app.py", "--server.port=7777", "--server.address=0.0.0.0"]