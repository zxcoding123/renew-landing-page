"use client"

import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa"

export default function Footer() {
  return (
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
            <ul className="mt-4 space-y-3 text-gray-600 text-sm">
              <li className="hover:text-[#E86A33] cursor-pointer">Features</li>
              <li className="hover:text-[#E86A33] cursor-pointer">How it works</li>
              <li className="hover:text-[#E86A33] cursor-pointer">Pricing</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">

          <p>© {new Date().getFullYear()} FoCi. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-[#E86A33] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#E86A33] cursor-pointer">Terms of Service</span>
          </div>

        </div>

      </div>
    </footer>
  )
}
