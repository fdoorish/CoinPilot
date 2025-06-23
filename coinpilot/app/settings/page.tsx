
"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };


  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="max-w-lg w-full p-8 bg-white text-black rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Settings</h1>


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
              {/* Change Password Button */}
              <button
                className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200"
              >
                Change Password
              </button>

              {/* Update Email Address Button */}
              <button
                className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200"
              >
                Update Email Address
              </button>

              {/* Update Phone Number Button */}
              <button
                className="w-full py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200"
              >
                Update Phone Number
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
              {/* Add or Remove Beneficiaries Button */}
              <button
                className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200"
              >
                Add or Remove Beneficiaries
              </button>

              {/* Transfer Limits Button */}
              <button
                className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200"
              >
                Transfer Limits
              </button>

              {/* Direct Debits Button */}
              <button
                className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200"
              >
                Direct Debits
              </button>

              {/* Scheduled Payments Button */}
              <button
                className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200"
              >
                Scheduled Payments
              </button>

              {/* Default Account for Payments Button */}
              <button
                className="w-full py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200"
              >
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
              {/* View Bank Statements Button */}
              <button
                className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200"
              >
                View Bank Statements
              </button>

              {/* Tax Documents Button */}
              <button
                className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200"
              >
                Tax Documents
              </button>

              {/* Terms and Conditions Button */}
              <button
                className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200"
              >
                Terms and Conditions
              </button>

              {/* Privacy Policy Button */}
              <button
                className="w-full py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200"
              >
                Privacy Policy
              </button>
            </div>
       )}
        </div>

        {/* ***************************************Privacy & Security*************************************** */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection("privacy")}
            className="w-full text-left font-medium text-lg py-2 px-4 bg-gray-100 rounded hover:bg-gray-200"
          >
            Privacy & Security
          </button>
          {expandedSection === "privacy" && (
            <div className="mt-2 p-4 bg-gray-50 border rounded">
              {/* Log In Methods Button */}
              <button
                className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200"
              >
                Log In Methods (Face ID/Fingerprint)
              </button>

              {/* App Timeout Button */}
              <button
                className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200"
              >
                App Timeout
              </button>

              {/* Data Sharing Preferences Button */}
              <button
                className="w-full mb-2 py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200"
              >
                Data Sharing Preferences
              </button>

              {/* Account Activity Report Button */}
              <button
                className="w-full py-2 px-4 bg-gray-100 text-blue-500 border border-gray-300 rounded hover:bg-gray-200"
              >
                Account Activity Report
              </button>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
