"use client"

import { useState } from "react"
import { FaTwitter, FaGithub, FaLinkedin, FaTimes } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

const Modal = ({ onClose, title, children }: { onClose: () => void; title: string; children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm cursor-pointer"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <FaTimes size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </motion.div>
    </div>
  )
}

const PrivacyPolicy = () => (
  <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
    <p>Last updated: {new Date().toLocaleDateString()}</p>
    <p>At FoCi, we prioritize your privacy. This policy outlines how we handle your data.</p>
    <h4 className="font-bold text-gray-900">1. Data Collection</h4>
    <p>We do not collect any personal identifiable information (PII). All your preferences, including sound mixes and timer settings, are stored locally on your device using your browser's Local Storage.</p>
    <h4 className="font-bold text-gray-900">2. Cookies</h4>
    <p>We use local storage to save your preferences. We do not use third-party tracking cookies.</p>
  </div>
)

const TermsOfService = () => (
  <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
    <p>Last updated: {new Date().toLocaleDateString()}</p>
    <h4 className="font-bold text-gray-900">1. Acceptance of Terms</h4>
    <p>By accessing and using FoCi, you accept and agree to be bound by the terms and provision of this agreement.</p>
    <h4 className="font-bold text-gray-900">2. Use License</h4>
    <p>Permission is granted to temporarily download one copy of the materials (information or software) on FoCi's website for personal, non-commercial transitory viewing only.</p>
    <h4 className="font-bold text-gray-900">3. Disclaimer</h4>
    <p>The materials on FoCi's website are provided "as is". FoCi makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.</p>
  </div>
)

export default function Footer() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null)

  return (
    <>
    <footer className="bg-[#FAF9F6] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <div>
            <h3 className="text-xl font-semibold text-gray-900">FoCi</h3>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed max-w-xs">
              Create your perfect sound environment for deep focus, relaxation, and mindful productivity anywhere.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Product
            </h4>
            <ul className="mt-4 space-y-0 text-gray-600 text-sm"> 
                 
              <li className="hover:text-[#E86A33] cursor-pointer">  <a href="/#features">Features </a></li>
             
            
              <li className="hover:text-[#E86A33] cursor-pointer">  <a href="/#how-it-works">How it works  </a></li>
            
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">

          <p>© {new Date().getFullYear()} FoCi. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <span onClick={() => setActiveModal("privacy")} className="hover:text-[#E86A33] cursor-pointer">Privacy Policy</span>
            <span onClick={() => setActiveModal("terms")} className="hover:text-[#E86A33] cursor-pointer">Terms of Service</span>
          </div>

        </div>

      </div>
    </footer>
    <AnimatePresence>
        {activeModal && (
          <Modal
            onClose={() => setActiveModal(null)}
            title={activeModal === "privacy" ? "Privacy Policy" : "Terms of Service"}
          >
            {activeModal === "privacy" ? <PrivacyPolicy /> : <TermsOfService />}
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
