"use client";

import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { ADMINCOLORS } from "../constant";
import CreatePaymentModal from "./CreatePaymentModal";

import {
  useGetPayments,
  useUpdatePayment,
  useDeletePayment,
} from "../hooks/auth/AdminMutation";
import SkeletonRow from "./SkeletonRow";

export default function PaymentSettingsTable() {
  const [openModal, setOpenModal] = useState(false);

  // Fetch all payments
  const { data: payments = [], isLoading } = useGetPayments();

  // Update status mutation
  const updatePayment = useUpdatePayment();

  // Delete payment mutation
  const {mutate:deletePayment, isPending} = useDeletePayment();

  // Create payment – refetching handled inside CreatePaymentModal
  const createPayment = () => {}; // You don't need anything here

  // Status update handler
  const toggleStatus = (id, currentStatus) => {
    updatePayment.mutate({
      id,
      data: {
        isActive: !currentStatus,
      },
    });
  };

  // Delete handler
  const handleDelete = (id) => {
    deletePayment(id);
  };

  return (
    <>
      <div
        className="rounded-xl p-6"
        style={{
          background: ADMINCOLORS.card,
          border: `1px solid ${ADMINCOLORS.border}`,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Payment Settings</h2>

          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold cursor-pointer"
            style={{ background: ADMINCOLORS.primary, color: "#000" }}
          >
            <Plus size={20} />
            Create
          </button>
        </div>

        {/* Table Wrapper */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse min-w-max">
            <thead>
              <tr style={{ background: ADMINCOLORS.accent }}>
                <th className="p-3 text-left text-white">QR Code</th>
                <th className="p-3 text-left text-white">UPI ID</th>
                <th className="p-3 text-left text-white">Status</th>
                <th className="p-3 text-left text-white">Created</th>
                <th className="p-3 text-left text-white">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
               <>
               <SkeletonRow/>
               <SkeletonRow/>
               <SkeletonRow/>
               </>
              ) : payments.length === 0 ? (
                <tr>
                  <td className="p-5 text-center text-gray-400" colSpan={5}>
                    No payment methods found
                  </td>
                </tr>
              ) : (
                payments.map((p, idx) => (
                  <tr
                    key={p._id}
                    className="border-b"
                    style={{
                      borderColor: ADMINCOLORS.border,
                      background:
                        idx % 2 === 0
                          ? ADMINCOLORS.rowEven
                          : ADMINCOLORS.rowOdd,
                    }}
                  >
                    <td className="p-3">
                      <img
                        src={p.qrImage}
                        width="60"
                        height="60"
                        className="rounded-lg"
                        style={{
                          border: `1px solid ${ADMINCOLORS.border}`,
                        }}
                      />
                    </td>

                    <td className="p-3 text-white">{p.upiId}</td>

                    <td className="p-3">
                      {p.isActive ? (
                        <span className="text-green-400">Active</span>
                      ) : (
                        <span className="text-red-400">Inactive</span>
                      )}
                    </td>

                    <td className="p-3 text-gray-400">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3 flex items-center gap-4">
                      {/* Toggle Status */}
                      <button
                        className="px-3 py-1 rounded-lg font-semibold cursor-pointer"
                        style={{
                          background: p.isActive
                            ? "rgba(239,68,68,0.25)"
                            : "rgba(16,185,129,0.25)",
                          color: p.isActive ? "#EF4444" : "#10B981",
                        }}
                        onClick={() => toggleStatus(p._id, p.isActive)}
                      >
                        {p.isActive ? "Deactivate" : "Activate"}
                      </button>

                      {/* Delete */}
                      <button
                        className="text-red-400 hover:text-red-300 cursor-pointer"
                        onClick={() => handleDelete(p._id)}
                      >
                         {isPending?<Trash2 size={18} className="animate-pulse"/>:<Trash2 size={18}/> }  
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <CreatePaymentModal
          onClose={() => setOpenModal(false)}
          onCreate={createPayment}
        />
      )}
    </>
  );
}
