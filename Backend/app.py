from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import os


app = Flask(__name__)
CORS(app)  # ✅ Add this line

model = pickle.load(open('model.pkl', 'rb'))
sc = pickle.load(open('standscaler.pkl', 'rb'))
mx = pickle.load(open('minmaxscaler.pkl', 'rb'))

@app.route('/')
def home():
    return "Welcome to Crop Recommendation API"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # ✅ Accept JSON

    N = data['Nitrogen']
    P = data['Phosporus']
    K = data['Potassium']
    temp = data['Temperature']
    humidity = data['Humidity']
    ph = data['pH']
    rainfall = data['Rainfall']

    features = np.array([N, P, K, temp, humidity, ph, rainfall]).reshape(1, -1)
    mx_scaled = mx.transform(features)
    final_input = sc.transform(mx_scaled)

    prediction = model.predict(final_input)

    crop_dict = {
        1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya", 7: "Orange",
        8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes", 12: "Mango", 13: "Banana",
        14: "Pomegranate", 15: "Lentil", 16: "Blackgram", 17: "Mungbean", 18: "Mothbeans",
        19: "Pigeonpeas", 20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"
    }

    crop_name = crop_dict.get(prediction[0], "Unknown crop")
    return jsonify({"prediction": f"{crop_name} is the best crop to be cultivated right there."})


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000)) 
    app.run(debug=False, host='0.0.0.0', port=port)

