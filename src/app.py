import streamlit as st

st.set_page_config(page_title="Bharat Culture Guide", page_icon="🇮🇳", layout="wide")

st.title("🇮🇳 Bharat Culture Guide")
st.subheader("Explore the diverse heritage, festivals, arts, and traditions of India.")

st.markdown("""
Welcome to the **Bharat Culture Guide**. This app aims to introduce and celebrate the rich cultural diversity of India.

---

### 🏵️ Topics You Can Explore:

- 🕉️ Indian Traditions  
- 🪔 Festivals of India  
- 🎨 Indian Art & Handicrafts  
- 🍛 Regional Food Varieties  
- 🎶 Classical Music & Dance Forms  
- 🏛️ Historical Monuments  

---

### 📌 What would you like to see?

Choose a topic from the sidebar to explore more.
""")

# Sidebar navigation (optional placeholder)
st.sidebar.title("Explore Topics")
topics = ["Indian Traditions", "Festivals", "Art & Handicrafts", "Regional Foods", "Music & Dance", "Monuments"]
choice = st.sidebar.radio("Choose a Topic", topics)

st.write(f"### 🔍 You selected: {choice}")
st.info("You can add more detailed content per topic here...")

# You can expand with content from files, APIs, or add images, videos, etc.
