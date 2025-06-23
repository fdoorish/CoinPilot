/**
 * This file defines a `SettingsModal` React component that renders a modal
 * with expandable sections for various user settings, such as account, banking,
 * documents, and privacy options. The modal is conditionally displayed based
 * on the `isOpen` prop and can be closed using the `onClose` callback.
 */

import { useState } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean; // Add darkMode as a prop
  setDarkMode: (value: boolean) => void; // Add setDarkMode as a prop
}

export default function SettingsModal({ isOpen, onClose, darkMode, setDarkMode }: SettingsModalProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white text-black rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Settings</h2>

        {/* Account & Profile Settings */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection("account")}
            className="w-full text-left font-medium text-lg py-2 px-4 bg-gray-100 rounded hover:bg-gray-200"
          >
            Account & Profile Settings
          </button>
          {expandedSection === "account" && (
            <div className="mt-2 p-4 bg-gray-50 border rounded">
              <button className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200">
                Change Password
              </button>
              <button className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200">
                Update Email Address
              </button>
              <button className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200">
                Update Phone Number
              </button>
              {/* Light/Dark Mode Button */}
              <button
                onClick={() => setDarkMode(!darkMode)} // Toggle dark mode
                className={`w-full py-2 px-4 mt-4 ${
                  darkMode
                    ? "bg-black text-white border border-gray-300 hover:bg-gray-800"
                    : "bg-gray-100 text-blue-500 border border-gray-300 hover:bg-gray-200"
                } rounded`}
              >
                {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </button>
            </div>
          )}
        </div>

        {/* Banking & Payment Settings */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection("banking")}
            className="w-full text-left font-medium text-lg py-2 px-4 bg-gray-100 rounded hover:bg-gray-200"
          >
            Banking & Payment Settings
          </button>
          {expandedSection === "banking" && (
            <div className="mt-2 p-4 bg-gray-50 border rounded">
              <button className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200">
                Add or Remove Beneficiaries
              </button>
              <button className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200">
                Transfer Limits
              </button>
              <button className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200">
                Direct Debits
              </button>
              <button className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200">
                Scheduled Payments
              </button>
              <button className="w-full py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200">
                Default Account for Payments
              </button>
            </div>
          )}
        </div>

        {/* Documents & Legal */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection("documents")}
            className="w-full text-left font-medium text-lg py-2 px-4 bg-gray-100 rounded hover:bg-gray-200"
          >
            Documents & Legal
          </button>
          {expandedSection === "documents" && (
            <div className="mt-2 p-4 bg-gray-50 border rounded">
              <button className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200">
                View Bank Statements
              </button>
              <button className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200">
                Tax Documents
              </button>
              <button className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200">
                Terms and Conditions
              </button>
              <button className="w-full py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200">
                Privacy Policy
              </button>
            </div>
          )}
        </div>

        {/* Privacy & Security */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection("privacy")}
            className="w-full text-left font-medium text-lg py-2 px-4 bg-gray-100 rounded hover:bg-gray-200"
          >
            Privacy & Security
          </button>
          {expandedSection === "privacy" && (
            <div className="mt-2 p-4 bg-gray-50 border rounded">
              <button className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200">
                Log In Methods (Face ID/Fingerprint)
              </button>
              <button className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200">
                App Timeout
              </button>
              <button className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200">
                Data Sharing Preferences
              </button>
              <button className="w-full py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200">
                Account Activity Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}