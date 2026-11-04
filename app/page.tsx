
"use client";

import { useState } from "react";

const products = [
  {
    name: "Sony A7 IV",
    category: "Cameras",
    price: 1800,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
    tag: "POPULAR",
  },
  {
    name: "Canon RF 70-200mm",
    category: "Lenses",
    price: 1200,
    image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800",
    tag: "PRO CHOICE",
  },
  {
    name: "Studio Lighting Kit",
    category: "Lighting",
    price: 900,
    image: "/studio-lighting.jpg",
    tag: "BEST VALUE",
  },
  {
    name: "DJI Camera Gimbal",
    category: "Accessories",
    price: 650,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800",
    tag: "TRENDING",
  },
];

const categories = ["All", "Cameras", "Lenses", "Lighting", "Accessories"];

export default function Home() {
  const [category, setCategory] = useState("All");
  const [days, setDays] = useState(3);
  const [selectedProduct, setSelectedProduct] = useState(products[0].name);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);
      async function handleEnquirySubmit(
  event: React.FormEvent<HTMLFormElement>
) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: formData.get("full_name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        start_date: formData.get("start_date"),
        return_date: formData.get("return_date"),
        delivery_method: formData.get("delivery_method"),
        message: formData.get("message"),
        selectedItems,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Submission failed.");
      return;
    }

    setEnquirySubmitted(true);
    alert("Rental enquiry submitted successfully!");
    form.reset();
    setSelectedItems([]);
  } catch {
    alert("Could not connect to the server. Please try again.");
  }
}

  return (
    <main className="min-h-screen bg-[#080b12] text-white">
      <nav className="flex items-center justify-between px-6 md:px-16 py-6 border-b border-white/10">
        <a href="#" className="text-2xl font-black tracking-tight">
          GEAR<span className="text-orange-400">SHARE.</span>
        </a>

        <div className="hidden md:flex gap-9 text-sm text-gray-300">
          <a href="#equipment" className="hover:text-orange-400">Equipment</a>
          <a href="#benefits" className="hover:text-orange-400">Why GearShare</a>
          <a href="#pricing" className="hover:text-orange-400">Pricing</a>
          <a href="#contact" className="hover:text-orange-400">Contact</a>
        </div>

        <a href="#contact" className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-full text-sm font-bold">
          Rent Equipment ↗
        </a>
      </nav>

      <section className="px-6 md:px-16 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-orange-400 uppercase tracking-[0.25em] text-xs font-bold">
            YOUR CREATIVE JOURNEY STARTS HERE
          </span>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mt-7">
            Create More.
            <br />
            <span className="text-orange-400">Own Less.</span>
          </h1>

          <p className="text-gray-400 mt-7 text-lg leading-8 max-w-lg">
            Rent professional photography equipment without the expensive
            investment. Discover your next creative possibility with GearShare.
          </p>

          <div className="flex flex-wrap gap-4 mt-9">
            <a href="#equipment" className="bg-orange-500 hover:bg-orange-600 px-7 py-4 rounded-full font-bold">
              Explore Equipment →
            </a>
            <a href="#benefits" className="border border-white/20 hover:bg-white/10 px-7 py-4 rounded-full">
              Discover More
            </a>
          </div>

          <div className="flex gap-10 mt-14">
            <div>
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-gray-500 text-sm">Equipment options</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">2K+</h3>
              <p className="text-gray-500 text-sm">Happy creators</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">24/7</h3>
              <p className="text-gray-500 text-sm">Online support</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200"
            alt="Professional photography camera"
            className="w-full h-[420px] md:h-[550px] object-cover rounded-3xl"
          />
          <div className="absolute bottom-6 left-6 bg-black/75 backdrop-blur-md p-5 rounded-2xl">
            <p className="text-orange-400 text-xs font-bold">CREATIVE FREEDOM</p>
            <p className="font-bold text-xl mt-1">The right gear. Every time.</p>
          </div>
        </div>
      </section>

      <section id="benefits" className="px-6 md:px-16 py-12 bg-[#101620] grid sm:grid-cols-3 gap-8">
        {[
          ["01", "Affordable Rentals", "Professional equipment without the purchase price."],
          ["02", "Flexible Duration", "Rent for a day, a weekend or an entire month."],
          ["03", "Quality Equipment", "Explore reliable equipment for your next shoot."],
        ].map(([number, title, description]) => (
          <div key={number} className="border-l-2 border-orange-500 pl-5">
            <p className="text-orange-400 text-sm">{number}</p>
            <h3 className="text-xl font-bold mt-3">{title}</h3>
            <p className="text-gray-400 mt-2 text-sm leading-6">{description}</p>
          </div>
        ))}
      </section>

      <section id="equipment" className="px-6 md:px-16 py-24">
        <div className="flex flex-wrap justify-between items-end gap-5">
          <div>
            <p className="text-orange-400 text-xs tracking-[0.2em] font-bold">EXPLORE OUR COLLECTION</p>
            <h2 className="text-4xl font-black mt-3">Find Your Perfect Gear.</h2>
          </div>
          <p className="text-gray-400 text-sm">Professional tools for every creator.</p>
        </div>

        <div className="flex gap-3 flex-wrap mt-10">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-5 py-3 rounded-full text-sm ${
                category === item
                  ? "bg-orange-500 text-white"
                  : "bg-[#18202c] text-gray-300 hover:bg-[#293445]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {filteredProducts.map((product) => (
            <article key={product.name} className="bg-[#111923] rounded-2xl overflow-hidden border border-white/10 group">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-4 left-4 bg-orange-500 px-3 py-2 text-xs rounded-full font-bold">
                  {product.tag}
                </span>
              </div>
              <div className="p-5">
                <p className="text-gray-500 text-xs">{product.category}</p>
                <h3 className="text-lg font-bold mt-2">{product.name}</h3>
                <div className="flex justify-between items-center mt-5">
                  <p className="font-bold text-orange-400">₹{product.price.toLocaleString("en-IN")}<span className="text-gray-500 text-xs"> /day</span></p>
                  <button
                    onClick={() => {
                      setSelectedProduct(product.name);
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm border border-white/20 rounded-full px-4 py-2 hover:bg-orange-500 hover:border-orange-500"
                  >
                    Rent →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="px-6 md:px-16 py-20 bg-[#101620]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-orange-400 text-xs font-bold tracking-[0.2em]">SIMPLE RENTAL PRICING</p>
          <h2 className="text-4xl font-black mt-4">Plan Your Next Shoot</h2>
          <p className="text-gray-400 mt-4">Choose your equipment and rental duration.</p>

          <div className="bg-[#080b12] rounded-3xl p-7 md:p-10 mt-10 text-left border border-white/10">
            <label className="block text-sm text-gray-400 mb-3">Select equipment</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full bg-[#18202c] border border-white/10 rounded-xl p-4 text-white"
            >
              {products.map((product) => (
                <option key={product.name} value={product.name}>{product.name}</option>
              ))}
            </select>

            <label className="block text-sm text-gray-400 mt-7 mb-3">
              Rental duration: {days} days
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full accent-orange-500"
            />

            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>1 day</span>
              <span>30 days</span>
            </div>

            <div className="border-t border-white/10 mt-8 pt-7 flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Estimated rental total</p>
                <p className="text-xs text-gray-500 mt-1">{days} days rental</p>
              </div>
              <h3 className="text-3xl font-black text-orange-400">
                ₹{(products.find((p) => p.name === selectedProduct)!.price * days).toLocaleString("en-IN")}
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 md:px-16 py-24 bg-[#101620]">
  <div className="max-w-3xl mx-auto">
    <div className="text-center">
      <p className="text-orange-400 text-xs tracking-[0.2em] font-bold">
        START YOUR RENTAL JOURNEY
      </p>
      <h2 className="text-4xl font-black mt-4">
        Rental Enquiry Form
      </h2>
      <p className="text-gray-400 mt-4">
        Select your equipment and tell us about your rental requirements.
      </p>
    </div>

    <form
      className="bg-[#080b12] rounded-3xl p-7 md:p-10 mt-10 border border-white/10 space-y-6"
      onSubmit={handleEnquirySubmit}
    >
      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Full Name
        </label>
        <input
          type="text"
          name="full_name"
          required
          placeholder="Enter your full name"
          className="w-full bg-[#18202c] border border-white/10 rounded-xl p-4 text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          className="w-full bg-[#18202c] border border-white/10 rounded-xl p-4 text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          required
          placeholder="Enter your phone number"
          className="w-full bg-[#18202c] border border-white/10 rounded-xl p-4 text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-3">
          Select Equipment (Multiple items allowed)
        </label>

        <div className="space-y-3">
          {products.map((product) => (
            <label
              key={product.name}
              className="flex items-center justify-between bg-[#18202c] rounded-xl p-4 cursor-pointer"
            >
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-xs text-gray-400">
                  ₹{product.price.toLocaleString("en-IN")} / day
                </p>
              </div>

              <input
                type="checkbox"
                checked={selectedItems.includes(product.name)}
                onChange={() => {
                  setSelectedItems((current) =>
                    current.includes(product.name)
                      ? current.filter((item) => item !== product.name)
                      : [...current, product.name]
                  );
                  setEnquirySubmitted(false);
                }}
                className="w-5 h-5 accent-orange-500"
              />
            </label>
          ))}
        </div>

        <p className="text-gray-500 text-xs mt-2">
          You can select more than one item.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Rental Start Date
          </label>
          <input
            type="date"
            name="start_date"
            required
            className="w-full bg-[#18202c] border border-white/10 rounded-xl p-4 text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Rental Return Date
          </label>
          <input
            type="date"
            name="return_date"
            required
            className="w-full bg-[#18202c] border border-white/10 rounded-xl p-4 text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Delivery Preference
        </label>
        <select
        name="delivery_method"
          required
          defaultValue=""
          className="w-full bg-[#18202c] border border-white/10 rounded-xl p-4 text-white"
        >
          <option value="" disabled>Select an option</option>
          <option value="delivery">Home Delivery</option>
          <option value="pickup">Self Pickup</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Additional Message
        </label>
        <textarea
        name="message"
          rows={4}
          placeholder="Tell us about your requirements..."
          className="w-full bg-[#18202c] border border-white/10 rounded-xl p-4 text-white"
        />
      </div>

      {enquirySubmitted && (
        <p className="text-green-400 text-sm">
        Your rental enquiry has been submitted successfully! We will contact you soon.
        </p>
      )}

      <button
        type="submit"
        disabled={selectedItems.length === 0}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed py-4 rounded-full font-bold"
      >
        Submit Rental Enquiry →
      </button>
    </form>
  </div>
</section>
      <footer className="border-t border-white/10 px-6 md:px-16 py-8 flex flex-wrap justify-between gap-4 text-sm text-gray-500">
        <p>© 2026 GearShare. Built for creators.</p>
        <p>Explore. Rent. Create.</p>
      </footer>
    </main>
  );
}
