"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchLogo, fetchNavbar } from "@/app/utils/fetchData"; // ✅ import from utils

export default function AdminPage() {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [newMenu, setNewMenu] = useState({ label: "", href: "" });

    const [editingItem, setEditingItem] = useState(null);
    const [editData, setEditData] = useState({ label: "", href: "" });



    const [logo, setLogo] = useState("");
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        async function loadData() {
            try {
                const [logoUrl, navbarItems] = await Promise.all([
                    fetchLogo(),
                    fetchNavbar(),
                ]);
                setLogo(logoUrl);
                setMenuItems(navbarItems);
            } catch (err) {
                console.error("Data fetch error:", err);
            }
        }
        loadData();
    }, [menuItems, editingItem]);


    // ✅ Upload Logo
    async function handleUpload() {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();

        if (data.success) {
            setLogo(data.fileUrl);
            setIsPopupOpen(false);
            setFile(null);
            alert('Header Logo updated!')
        } else alert("Upload failed!");
    }

    // ✅ Add Menu Item
    async function addMenuItem() {
        const res = await fetch("/api/navbar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMenu),
        });
        const data = await res.json();

        // ✅ Handle cases where API returns object or wrapped response
        if (data && data.id) {
            setMenuItems((prev) => Array.isArray(prev) ? [...prev, data] : [data]);
        }

        setNewMenu({ label: "", href: "" });
    }


    // ✅ Toggle Visibility
    async function toggleVisibility(item) {
        await fetch("/api/navbar", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...item,
                visible: !item.visible,
            }),
        });
        if (res.ok) {
            alert("✅ Visibility updated successfully!");
            await fetchNavbar(); // Refresh data
        } else {
            alert("❌ Failed to update visibility.");
        }
        fetchNavbar();

    }

    // ✅ Delete Item
    async function deleteItem(id) {
        await fetch("/api/navbar", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        setMenuItems(menuItems.filter((i) => i.id !== id));
    }

    // ✅ Edit Menu Item
    async function updateMenuItem() {
        if (!editingItem) return;

        const res = await fetch("/api/navbar", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: editingItem.id, ...editData }),
        });

        const data = await res.json();

        if (data.success) {
            fetchNavbar(); // reload updated items
            setEditingItem(null);
        } else {
            alert("Failed to update menu item");
        }
    }





    return (
        <section className="py-6 admin-main bg-gray-50 min-h-screen ml-64 bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-bold mb-6"> Logo and Menus</h1>

                {/* ✅ LOGO SECTION */}
                <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between mb-8">
                    <div className="flex items-center gap-6">
                        {logo ? (
                            <Image
                                src={logo}
                                alt="Logo"
                                width={120}
                                height={60}
                                className="object-contain"
                            />
                        ) : (
                            <div className="w-[120px] h-[60px] bg-gray-200 flex items-center justify-center text-gray-500">
                                No Logo
                            </div>
                        )}
                        <span className="text-gray-700 font-medium">Current Logo</span>
                    </div>

                    <button
                        onClick={() => setIsPopupOpen(true)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow transition"
                    >
                        Change Logo
                    </button>
                </div>

                {/* ✅ NAVBAR SECTION */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Navigation Menu</h2>

                    <div className="space-y-3">
                        {Array.isArray(menuItems) && menuItems.length > 0 ? (
                            menuItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center border p-3 rounded-lg"
                                >
                                    {editingItem?.id === item.id ? (
                                        // ✅ Edit form
                                        <div className="flex flex-col sm:flex-row gap-2 w-full justify-between">
                                            <div className="flex flex-col sm:flex-row gap-2 flex-1">
                                                <input
                                                    type="text"
                                                    value={editData.label}
                                                    onChange={(e) => setEditData({ ...editData, label: e.target.value })}
                                                    className="border px-2 py-1 rounded w-full sm:w-1/2"
                                                />
                                                <input
                                                    type="text"
                                                    value={editData.href}
                                                    onChange={(e) => setEditData({ ...editData, href: e.target.value })}
                                                    className="border px-2 py-1 rounded w-full sm:w-1/2"
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={updateMenuItem}
                                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingItem(null)}
                                                    className="border px-3 py-1 rounded text-gray-600 hover:bg-gray-100"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // ✅ Normal view
                                        <>
                                            <div>
                                                <p className="font-medium">{item.label}</p>
                                                <p className="text-gray-500 text-sm">{item.href}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => toggleVisibility(item)}
                                                    className={`px-3 py-1 rounded ${item.visible
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-200 text-gray-600"
                                                        }`}
                                                >
                                                    {item.visible ? "Visible" : "Hidden"}
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setEditingItem(item);
                                                        setEditData({ label: item.label, href: item.href, visible: item.visible });
                                                    }}
                                                    className="text-blue-500 hover:text-blue-600"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => deleteItem(item.id)}
                                                    className="text-red-500 hover:text-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>

                            ))
                        ) : (
                            <p className="text-gray-500 italic">No menu items found</p>
                        )}

                    </div>

                    {/* Add New Menu */}
                    <div className="mt-6 flex gap-3">
                        <input
                            type="text"
                            placeholder="Label"
                            value={newMenu.label}
                            onChange={(e) =>
                                setNewMenu({ ...newMenu, label: e.target.value })
                            }
                            className="border px-3 py-2 rounded w-1/3"
                        />
                        <input
                            type="text"
                            placeholder="Link (href)"
                            value={newMenu.href}
                            onChange={(e) => setNewMenu({ ...newMenu, href: e.target.value })}
                            className="border px-3 py-2 rounded w-1/3"
                        />
                        <button
                            onClick={addMenuItem}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* ✅ Logo Upload Popup */}
                {isPopupOpen && (
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-lg w-[400px] p-6">
                            <h2 className="text-xl font-semibold mb-4">Upload New Logo</h2>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setIsPopupOpen(false)}
                                    className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpload}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
