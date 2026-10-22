# Part VIII: Types as Proofs

*Every part so far has used types to rule out wrong programs. This last part asks how far that idea goes. Borrowing heavily from Haskell's type system, we build the core of a payment processor and push correctness into the types as far as Rust allows: types as propositions, state machines checked by the compiler, evidence that can't be forged, and the honest limits where a type checker hands over to refinement types, proofs and model checking.*
