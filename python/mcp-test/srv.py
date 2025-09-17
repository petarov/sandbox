#!/usr/bin/env python3

from flask import Flask, request, jsonify
import random
import json
from typing import Dict, Any

app = Flask(__name__)

class WeatherMCPServer:
    def __init__(self):
        self.server_info = {
            "name": "weather-server",
            "version": "1.0.0"
        }
        
        self.capabilities = {
            "tools": {},
            "resources": {},
            "prompts": {}
        }
        
        self.tools = [
            {
                "name": "weather",
                "description": "Get weather information for a city",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "city": {
                            "type": "string",
                            "description": "Name of the city"
                        }
                    },
                    "required": ["city"]
                }
            }
        ]

    def get_weather(self, city: str) -> Dict[str, Any]:
        """Generate random weather data for a city"""
        # Generate random weather data
        temperature = random.randint(-10, 40)  # Temperature in Celsius
        precipitation = random.randint(0, 100)  # Precipitation percentage
        rain_probability = random.randint(0, 100)  # Rain probability percentage
        
        # Random weather conditions
        conditions = ["Sunny", "Cloudy", "Partly Cloudy", "Overcast", "Rainy", "Stormy", "Foggy"]
        condition = random.choice(conditions)
        
        return {
            "city": city,
            "temperature": temperature,
            "temperature_unit": "°C",
            "condition": condition,
            "precipitation": precipitation,
            "rain_probability": rain_probability
        }

# Create server instance
weather_server = WeatherMCPServer()

def create_jsonrpc_response(result=None, error=None, request_id=None):
    """Create a JSON-RPC 2.0 response"""
    response = {
        "jsonrpc": "2.0",
        "id": request_id
    }
    
    if error:
        response["error"] = error
    else:
        response["result"] = result
        
    return response

def create_jsonrpc_error(code, message, request_id=None):
    """Create a JSON-RPC 2.0 error response"""
    return create_jsonrpc_response(
        error={"code": code, "message": message},
        request_id=request_id
    )

@app.route('/', methods=['POST'])
def handle_jsonrpc():
    """Handle JSON-RPC requests at root endpoint"""
    try:
        data = request.get_json()
        if not data:
            return jsonify(create_jsonrpc_error(-32700, "Parse error")), 400
            
        method = data.get("method")
        params = data.get("params", {})
        request_id = data.get("id")
        
        if method == "initialize":
            result = {
                "protocolVersion": "2024-11-05",
                "capabilities": weather_server.capabilities,
                "serverInfo": weather_server.server_info
            }
            return jsonify(create_jsonrpc_response(result, request_id=request_id))
            
        elif method == "tools/list":
            result = {"tools": weather_server.tools}
            return jsonify(create_jsonrpc_response(result, request_id=request_id))
            
        elif method == "tools/call":
            tool_name = params.get("name")
            arguments = params.get("arguments", {})
            
            if tool_name != "weather":
                return jsonify(create_jsonrpc_error(-32601, f"Unknown tool: {tool_name}", request_id)), 404
                
            city = arguments.get("city")
            if not city:
                return jsonify(create_jsonrpc_error(-32602, "Missing required parameter: city", request_id)), 400
                
            try:
                weather_data = weather_server.get_weather(city)
                
                result = {
                    "content": [
                        {
                            "type": "text",
                            "text": f"Weather for {weather_data['city']}:\n"
                                   f"Temperature: {weather_data['temperature']}{weather_data['temperature_unit']}\n"
                                   f"Condition: {weather_data['condition']}\n"
                                   f"Precipitation: {weather_data['precipitation']}%\n"
                                   f"Rain Probability: {weather_data['rain_probability']}%"
                        }
                    ]
                }
                
                return jsonify(create_jsonrpc_response(result, request_id=request_id))
                
            except Exception as e:
                return jsonify(create_jsonrpc_error(-32603, f"Internal error: {str(e)}", request_id)), 500
                
        # Handle MCP notifications (these don't require responses)
        elif method == "notifications/initialized":
            # This is a notification from the client that initialization is complete
            # No response needed for notifications
            return "", 204
            
        elif method == "ping":
            # Handle ping requests
            result = {"pong": True}
            return jsonify(create_jsonrpc_response(result, request_id=request_id))
            
        elif method == "resources/list":
            # Handle resources list (empty for this server)
            result = {"resources": []}
            return jsonify(create_jsonrpc_response(result, request_id=request_id))
            
        elif method == "prompts/list":
            # Handle prompts list (empty for this server)
            result = {"prompts": []}
            return jsonify(create_jsonrpc_response(result, request_id=request_id))
            
        else:
            return jsonify(create_jsonrpc_error(-32601, f"Method not found: {method}", request_id)), 404
            
    except json.JSONDecodeError:
        return jsonify(create_jsonrpc_error(-32700, "Parse error")), 400
    except Exception as e:
        return jsonify(create_jsonrpc_error(-32603, f"Internal error: {str(e)}")), 500

@app.route('/', methods=['GET'])
def root_info():
    """Root endpoint with server info for GET requests"""
    return jsonify({
        "message": "Weather MCP Server",
        "version": weather_server.server_info["version"],
        "protocol": "JSON-RPC 2.0 over HTTP",
        "endpoint": "POST /",
        "available_tools": [tool["name"] for tool in weather_server.tools]
    })

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "server": weather_server.server_info
    })

# Handle preflight requests for CORS
@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = jsonify()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        return response

@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    return response

if __name__ == "__main__":
    print("Starting Weather MCP HTTP Server...")
    print("Server will accept JSON-RPC 2.0 requests at: POST /")
    print("Server info available at: GET /")
    print("Health check at: GET /health")
    print()
    print("Example JSON-RPC request:")
    print('  POST /')
    print('  {')
    print('    "jsonrpc": "2.0",')
    print('    "method": "tools/call",')
    print('    "params": {')
    print('      "name": "weather",')
    print('      "arguments": {"city": "London"}')
    print('    },')
    print('    "id": 1')
    print('  }')
    print()
    
    # Run the Flask app
    app.run(host='0.0.0.0', port=8000, debug=True)
