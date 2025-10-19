# CHROMA Professional Color Science Roadmap

## Current State (Session 4 - Complete ✅)
**Foundation: Cinema-Grade Color Science Pipeline**
- ✅ ACEScg preprocessing with exposure/white balance detection
- ✅ K-means clustering (12 clusters) for intelligent color sampling
- ✅ Lab/LCh perceptual color operations
- ✅ John Hable filmic tone curves with shoulder/toe
- ✅ ACES/Rec.2020 → Rec.709 gamut mapping
- ✅ Skin tone protection
- ✅ Multi-format export (.cube, .3dl, .look, .lut, .xmp)

---

## Phase 5: Adaptive Intelligence (Q1 2026)
**Goal**: Make the color science smarter and more context-aware

### 5.1 Scene Context Detection (Creator+)
**Implementation**: Rule-based heuristic system
- Detect scene type: portrait / landscape / low light / high key / sunset / night
- Analyze histogram shape, color distribution, skin tone presence
- Apply scene-appropriate weighting to clustering and tone curves
- **Tier**: Creator+ (adds value to unlimited generations)
- **Complexity**: Medium
- **Dependencies**: Current k-means + histogram analysis

### 5.2 Dynamic Range Normalization (All Tiers)
**Implementation**: Histogram-based preprocessing enhancement
- Match histogram dynamic range to 0.1–99.9 percentile
- Prevents crushed blacks and blown highlights
- Adaptive based on input image characteristics
- **Tier**: All (improves quality universally)
- **Complexity**: Low
- **Dependencies**: Current preprocessing pipeline

### 5.3 Adaptive S-Curve (Creator+)
**Implementation**: Scene-contrast-aware tone mapping
- Measure input histogram contrast
- Scale filmic curve strength inversely (high contrast → gentler curve)
- Prevents over-grading already contrasty images
- **Tier**: Creator+ (professional feature)
- **Complexity**: Medium
- **Dependencies**: Current tone curve system

**Deliverables**:
- More intelligent, context-aware LUT generation
- Better handling of diverse source images
- Professional-grade adaptive grading

---

## Phase 6: Camera & Film Emulation (Q2 2026)
**Goal**: Emulate specific cameras and film stocks for authentic looks

### 6.1 Film Stock Emulation Library (Pro+)
**Implementation**: Parameterized highlight roll-off profiles
- Kodak 2383 (classic cinema print film)
- Fuji Eterna (natural, muted colors)
- Kodak Vision3 500T (modern cinema)
- Fuji Pro 400H (wedding/portrait favorite)
- User-selectable in UI as "Film Look" preset
- **Tier**: Pro (premium aesthetic feature)
- **Complexity**: Medium-High
- **Dependencies**: Current tone curve system + research

### 6.2 Camera Response Curve Estimation (Pro+)
**Implementation**: EXIF-based sensor profile approximation
- Read camera model from EXIF (Canon, Sony, ARRI, RED, etc.)
- Apply inverse camera response curve for scene-linear accuracy
- Ensures consistency across DSLR, phone, cinema camera stills
- **Tier**: Pro (professional workflow feature)
- **Complexity**: High
- **Dependencies**: EXIF parsing, camera profile database

### 6.3 Saturation-Luminance Coupling (Creator+)
**Implementation**: Perceptual color adjustment
- Analyze saturation-luminance relationship in reference image
- Maintain perceived brightness during hue shifts
- Prevents color shifts from feeling "off" or unnatural
- **Tier**: Creator+ (quality improvement)
- **Complexity**: Medium
- **Dependencies**: Current Lab/LCh implementation

**Deliverables**:
- Authentic film stock emulation presets
- Camera-specific color science accuracy
- More natural perceptual color transformations

---

## Phase 7: Next-Gen Color Spaces (Q3 2026)
**Goal**: Cutting-edge HDR and wide-gamut support

### 7.1 JzAzBz Color Space Support (Studio)
**Implementation**: Modern HDR color space integration
- HDR grading standard (Dolby Vision uses internally)
- Better than Lab for extreme saturations
- Avoids hue skew in HDR content
- Required for HDR LUT generation (future feature)
- **Tier**: Studio (future HDR workflow)
- **Complexity**: High
- **Dependencies**: colorjs.io or custom implementation

### 7.2 CAM16 Perceptual Space (Pro+)
**Implementation**: Modern perceptual color model
- More accurate than Lab for color appearance
- Better hue preservation under extreme conditions
- Improved gamut mapping
- **Tier**: Pro+ (advanced color science)
- **Complexity**: High
- **Dependencies**: CAM16 implementation (colorjs.io)

### 7.3 Perceptual Gamut Compression (Pro+)
**Implementation**: Smart tone-mapping for gamut
- Replace linear clipping with Reinhard/Hable tone maps
- Hue-anchored compression (preserve hue while desaturating)
- More realistic out-of-gamut color handling
- **Tier**: Pro+ (professional quality)
- **Complexity**: Medium-High
- **Dependencies**: Current gamut mapping + tone operators

**Deliverables**:
- HDR workflow foundation
- Best-in-class perceptual accuracy
- Professional gamut handling

---

## Phase 8: ML-Powered Intelligence (Q4 2026)
**Goal**: Neural network enhancement for professional results

### 8.1 Style Clustering & Tagging (Studio)
**Implementation**: CLIP/ViT embeddings for style recognition
- Analyze reference image → tag style ("Moody teal-orange", "Cinematic neutral")
- Let users search/browse saved LUTs by style, not just filename
- Automatic style suggestions based on input image
- **Tier**: Studio (premium AI feature)
- **Complexity**: Very High
- **Dependencies**: CLIP/ViT model, vector database, GPU inference

### 8.2 Cross-Camera LUT Calibration (Studio)
**Implementation**: ML model for camera color science mapping
- Train on matched camera pairs (Sony → ARRI look, Canon → RED, etc.)
- User uploads image + selects "target camera aesthetic"
- Generate LUT that transforms color science between cameras
- **Standalone product potential** ($50-100/calibration LUT)
- **Tier**: Studio (could be separate premium product)
- **Complexity**: Very High
- **Dependencies**: Training dataset, ML pipeline, GPU inference

### 8.3 Neural LUT Refinement (Pro+)
**Implementation**: Trained on professional colorist grades
- Take generated LUT → neural network refines to match pro quality
- Learn from curated dataset of before/after professional grades
- Optional toggle: "AI Enhancement" checkbox
- **Tier**: Pro+ (quality boost)
- **Complexity**: Very High
- **Dependencies**: Training dataset, model hosting, inference pipeline

**Deliverables**:
- AI-powered style recognition and search
- Revolutionary cross-camera color matching
- Professional-quality AI enhancement

---

## Phase 9: Quality Assurance System (Ongoing)
**Goal**: Professional validation and quality metrics

### 9.1 LUT Quality Score (Pro+)
**Implementation**: Comprehensive quality analysis
- ΔE2000 color difference metric (industry standard)
- Tone curve consistency analysis
- Clipping percentage (shadows, highlights, midtones)
- Gamut coverage metrics
- Generate quality report PDF
- **Tier**: Pro+ (professional QA)
- **Complexity**: Medium
- **Dependencies**: Color science libraries, PDF generation

### 9.2 Before/After Analysis (Creator+)
**Implementation**: Visual comparison tools
- Render sample color swatches (before/after LUT)
- Vectorscope comparison
- Waveform comparison
- Side-by-side preview with split view
- **Tier**: Creator+ (workflow enhancement)
- **Complexity**: Medium
- **Dependencies**: Canvas rendering, color analysis

### 9.3 LUT Validation & Warnings (All Tiers)
**Implementation**: Automated quality checks
- Warn if excessive clipping detected
- Flag if skin tones shifted outside natural range
- Alert if gamut mapping caused severe desaturation
- Suggest adjustments (reduce intensity, change grid size)
- **Tier**: All (quality safeguard)
- **Complexity**: Low-Medium
- **Dependencies**: Current analysis systems

**Deliverables**:
- Professional QA metrics and reporting
- Visual comparison tools for colorists
- Smart warnings prevent bad LUTs

---

## Tier Feature Matrix (Future State)

### Free Tier
- ✅ Current features (3 LUTs/month, basic quality)
- ✅ Dynamic Range Normalization
- ✅ LUT Validation & Warnings

### Creator Tier ($7/mo)
- ✅ Unlimited generations, 3 formats
- ✅ Current professional pipeline
- ✅ Scene Context Detection
- ✅ Adaptive S-Curve
- ✅ Saturation-Luminance Coupling
- ✅ Before/After Analysis Tools

### Pro Tier ($12/mo)
- ✅ All 5 formats, unlimited features
- ✅ Film Stock Emulation Library
- ✅ Camera Response Curve Estimation
- ✅ CAM16 Perceptual Space
- ✅ Perceptual Gamut Compression
- ✅ Neural LUT Refinement
- ✅ LUT Quality Score & Reports

### Studio Tier ($25/mo)
- ✅ All Pro features
- ✅ JzAzBz HDR Support
- ✅ Style Clustering & AI Tagging
- ✅ Cross-Camera LUT Calibration
- ✅ Team features (coming)
- ✅ Priority processing (GPU acceleration)

---

## Implementation Priority Recommendations

### Quick Wins (Next 1-2 months)
1. **Dynamic Range Normalization** - Easy, universal benefit
2. **Scene Context Detection** - Medium effort, high perceived value
3. **Adaptive S-Curve** - Builds on existing tone curves

### High-Value Differentiators (3-6 months)
1. **Film Stock Emulation** - Killer feature, marketing-friendly
2. **LUT Quality Score** - Professional credibility
3. **Camera Response Curve** - Pro workflow essential

### Long-Term Investments (6-12 months)
1. **ML Style Clustering** - Requires infrastructure
2. **Cross-Camera Calibration** - Potential standalone product
3. **JzAzBz HDR Support** - Future-proofing for HDR workflows

### Research & Validation
1. Build dataset of professional grades for ML training
2. Test CAM16 vs Lab for quality improvements
3. Validate film stock emulation against real scans
4. Profile major camera sensors (Canon, Sony, ARRI, RED)

---

## Technical Dependencies

### Libraries & Tools
- **colorjs.io**: CAM16, JzAzBz support
- **sharp**: Current (continue using)
- **TensorFlow.js or ONNX Runtime**: ML inference
- **CLIP/ViT**: Style embeddings (Hugging Face)
- **PDF generation**: Quality reports (pdfkit or similar)

### Infrastructure
- **GPU instances**: ML inference (AWS Lambda with GPU, Modal, Replicate)
- **Vector database**: Style search (Pinecone, Weaviate)
- **Training pipeline**: MLOps for model updates
- **CDN**: Film stock LUT presets (fast delivery)

### Data Requirements
- Camera sensor profiles database (50-100 major cameras)
- Film stock reference scans (Kodak, Fuji libraries)
- Professional colorist grade dataset (1000+ examples)
- Style-tagged reference image dataset (5000+ images)

---

## Business Considerations

### Pricing Strategy Evolution
- **Creator tier stays at $7/mo** (value increases over time)
- **Pro tier could increase to $15-20/mo** as features expand
- **Studio tier could increase to $40-50/mo** with ML features
- **Add-on pricing**: Cross-camera calibration at $50-100 per camera pair

### Competitive Positioning
- **Free tier**: Best free LUT generator (quality over quantity)
- **Creator tier**: Professional results, unlimited use (vs competitors' limits)
- **Pro tier**: Film emulation + camera matching (unique in market)
- **Studio tier**: AI-powered, cross-camera calibration (no competition)

### Go-to-Market Opportunities
1. **Film Stock Library** → Marketing to wedding photographers, filmmakers
2. **Camera Calibration** → Enterprise sales to production companies
3. **Quality Score** → Professional colorist credibility
4. **Style Clustering** → Social media discovery ("trending looks")

---

## Success Metrics

### Phase 5-6 (Adaptive Intelligence + Film Emulation)
- Improved LUT satisfaction rating (user feedback)
- Reduced "intensity too high" user complaints
- Increased Pro tier conversions (film stocks = value)

### Phase 7-8 (Next-Gen Color + ML)
- Studio tier adoption rate
- Cross-camera calibration revenue
- ML model accuracy vs human colorist grades

### Phase 9 (Quality Assurance)
- Reduced support tickets about "bad LUTs"
- Increased professional user retention
- Quality score becomes marketing differentiator

---

## Notes

This roadmap prioritizes:
1. **Foundation first** (Phases 5-6): Improve core quality and add proven techniques
2. **Differentiation** (Phase 7): Modern color spaces position as industry leader
3. **Innovation** (Phase 8): ML creates moat and premium pricing power
4. **Quality** (Phase 9): Professional validation cements reputation

Each phase builds on previous work and can be shipped independently. Features are tiered to drive upgrades while maintaining free tier value.
