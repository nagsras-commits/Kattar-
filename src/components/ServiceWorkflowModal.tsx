import React, { useState } from 'react';
import { ServiceProvider } from '../types/kattar';
import { DevineIntelligenceSeal } from './OrgBadges';
import { 
  CheckCircle2, 
  CreditCard, 
  Star, 
  Download, 
  ArrowRight, 
  X, 
  Lock,
  ThumbsUp
} from 'lucide-react';

interface ServiceWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: ServiceProvider;
}

export const ServiceWorkflowModal: React.FC<ServiceWorkflowModalProps> = ({
  isOpen,
  onClose,
  provider,
}) => {
  const [phase, setPhase] = useState<'billing' | 'success' | 'review'>('billing');
  const [selectedUpi, setSelectedUpi] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [rating, setRating] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Punctual', 'Professional']);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen) return null;

  const quickTags = ['Punctual', 'Professional', 'Fair Pricing', 'Clean Work', 'Polite & Respectful'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPhase('success');
    }, 1200);
  };

  const handleSubmitReview = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-white">
              {phase === 'billing' ? 'Service Completion & Payment' : phase === 'success' ? 'Payment Confirmed' : 'Rate & Review Service'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6">
          {/* PHASE 1: BILLING & PAYMENT */}
          {phase === 'billing' && (
            <div className="space-y-5">
              {/* Provider Info Card */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
                <div className="flex items-center gap-3">
                  <img
                    src={provider.avatar}
                    alt={provider.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-white">{provider.name}</h3>
                    <p className="text-[11px] text-orange-400">{provider.profession}</p>
                    <span className="text-[10px] text-neutral-400 font-mono">Job #KTR-7729</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  COMPLETED
                </span>
              </div>

              {/* Transparent Billing Breakdown */}
              <div className="space-y-2 text-xs">
                <h4 className="font-semibold text-neutral-300">Billing Breakdown</h4>
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <div className="flex justify-between text-neutral-400">
                    <span>Labor & Service Charges:</span>
                    <span className="font-mono text-white">₹450.00</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Replacement Parts (Brass Joint):</span>
                    <span className="font-mono text-white">₹305.00</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Community Facilitation Fee:</span>
                    <span className="font-mono text-emerald-400">₹0.00 (Free Seva)</span>
                  </div>
                  <div className="pt-2 border-t border-neutral-800 flex justify-between font-bold text-sm text-white">
                    <span>Total Amount Payable:</span>
                    <span className="font-mono text-orange-400">₹755.00</span>
                  </div>
                </div>
              </div>

              {/* UPI Payment Options */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300 block">
                  Select Instant UPI Method (Recommended)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['gpay', 'phonepe', 'paytm'] as const).map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSelectedUpi(m)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-colors ${
                        selectedUpi === m
                          ? 'bg-orange-600 text-white border-orange-500'
                          : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Secure Pay CTA */}
              <button
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isProcessing ? 'Processing UPI Payment...' : 'Pay ₹755.00 via UPI'}</span>
              </button>
            </div>
          )}

          {/* PHASE 2: PAYMENT SUCCESS */}
          {phase === 'success' && (
            <div className="text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-1">Payment Successful!</h3>
                <p className="text-xs text-neutral-400">Transaction ID: UPI-KTR-99482104</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Amount Paid:</span>
                  <span className="font-mono font-bold text-white text-sm">₹755.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Paid to:</span>
                  <span className="font-semibold text-white">{provider.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Date & Time:</span>
                  <span className="font-mono text-neutral-300">29 Oct 2026, 10:15 AM</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => setPhase('review')}
                  className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>Rate & Review Provider</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium rounded-xl transition-colors"
                >
                  Close & Return to Chat
                </button>
              </div>
            </div>
          )}

          {/* PHASE 3: RATING & REVIEW */}
          {phase === 'review' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="text-center">
                <h3 className="text-sm font-bold text-white mb-1">How was your experience?</h3>
                <p className="text-xs text-neutral-400">Rate {provider.name} ({provider.profession})</p>
              </div>

              {/* 5-Star Interactive Rating */}
              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-115 transition-transform"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-neutral-700'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Quick Feedback Tags */}
              <div>
                <span className="text-xs font-medium text-neutral-300 block mb-2">
                  Highlight Qualities:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickTags.map(tag => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 text-xs rounded-lg border transition-colors ${
                          isSelected
                            ? 'bg-orange-600 border-orange-500 text-white'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Review Comment */}
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">
                  Comments for Community:
                </label>
                <textarea
                  value={reviewComment}
                  onChange={e => setReviewComment(e.target.value)}
                  placeholder="Arrived on time, fixed leak cleanly with genuine parts..."
                  className="w-full h-20 bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                onClick={handleSubmitReview}
                className="w-full py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                Submit Verified Review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
