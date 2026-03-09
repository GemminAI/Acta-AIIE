### **The AIIE Protocol: Mathematical Standardization of Narrative Intent**

- **Status:** Protocol Standard v4.1.1 (Refined)
    
- **Editor:** Acta AIIE Standardization Committee
    
- **Implementation Reference:** Gemmina Intelligence JCS Engine v1.0.0
    

---

#### **1. Abstract**

This specification defines the technical structure of the **24TAG** data schema within the **Acta AIIE Protocol** (Artificial Intelligence Intent Encapsulation). The protocol is designed to pack the entire process—from the emergence of information to its mathematical proof—into a single, immutable JSON object. This ensures the **"Crystallization of Information,"** where even a 1-bit alteration is detectable, thereby fixing the original intent against posterior manipulation.

#### **2. The 24TAG Taxonomy: Structural Definitions**

Information is multidimensionally described through 24 specific tags across 6 categories. These tags transform subjective narratives into computable vectors.

**Category I: Identification & Base Context**

Establishes the "Digital Registry" of information.

- **01. permanent_id**: A persistent identifier using the `gmn://` scheme.
    
- **02. subject_origin**: The geopolitical or systemic origin of the narrative (e.g., JP, CN, US).
    
- **06. time_frame**: Precise timestamping in ISO 8601 (UTC/Z) format.
    

**Category II: Dynamics & Structure**

Quantifies causal relationships and strategic intent.

- **09. strategic_interest_vector**: Represents impact across six dimensions (Security, Economy, etc.) on a scale of $-1.0$ to $1.0$.
    
- **12. narrative_viscosity**: Measures the resistance of a narrative to external corrective information.
    

#### **3. Integrity through JCS (JSON Canonicalization Schema)**

To ensure the "Crystallization" of the protocol, every AIIE object must be hashed using the JCS standard. This mathematical lock ensures that the observer's intent and the observed data are inseparable and tamper-proof.