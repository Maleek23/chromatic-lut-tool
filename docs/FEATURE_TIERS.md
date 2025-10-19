# CHROMA Feature Tier Summary

## Current Implementation (Session 4) ✅

### All Tiers
- Professional color science pipeline (ACEScg, Lab/LCh)
- K-means clustering color analysis
- Filmic tone curves with shoulder/toe
- Skin tone protection
- Gamut mapping (ACES → Rec.709)

### Free Tier
- 3 LUTs/month (resets on 1st)
- .cube format only
- 17³ grid size
- $2.50/LUT after limit

### Creator Tier ($7/mo)
- ✅ Unlimited LUT generations
- ✅ 3 export formats: .cube, .3dl, .look
- ✅ Grid sizes: 17³, 33³
- ✅ Folder organization for saved presets

### Pro Tier ($12/mo)
- ✅ All 5 export formats: .cube, .3dl, .look, .lut, .xmp
- ✅ All grid sizes: 17³, 33³, 65³
- ✅ All analysis tools
- ✅ Email delivery (pending domain verification)

### Studio Tier ($25/mo)
- ✅ All Pro features
- 🔮 Team features (planned)

---

## Future Phases (Roadmap)

### Phase 5: Adaptive Intelligence
**Quick wins that make existing features smarter**

| Feature | Tier | Value |
|---------|------|-------|
| Dynamic Range Normalization | All | Better quality universally |
| Scene Context Detection | Creator+ | Smart scene-aware grading |
| Adaptive S-Curve | Creator+ | Prevent over-grading |
| Saturation-Luminance Coupling | Creator+ | More natural colors |

### Phase 6: Camera & Film Emulation
**Professional aesthetic features**

| Feature | Tier | Value |
|---------|------|-------|
| Film Stock Emulation (Kodak 2383, Fuji Eterna, etc.) | Pro | Authentic film looks |
| Camera Response Curves (Canon, Sony, ARRI) | Pro | Cross-camera consistency |

### Phase 7: Next-Gen Color Spaces
**Cutting-edge HDR and wide-gamut**

| Feature | Tier | Value |
|---------|------|-------|
| CAM16 Perceptual Space | Pro | Better than Lab for accuracy |
| Perceptual Gamut Compression | Pro | Smarter out-of-gamut handling |
| JzAzBz HDR Support | Studio | HDR workflow foundation |

### Phase 8: ML-Powered Intelligence
**AI features that create competitive moat**

| Feature | Tier | Value |
|---------|------|-------|
| Neural LUT Refinement | Pro | AI quality boost |
| Style Clustering & Tagging | Studio | "Moody teal-orange", search by style |
| Cross-Camera Calibration | Studio | Sony → ARRI look (could be $50-100 standalone) |

### Phase 9: Quality Assurance
**Professional validation tools**

| Feature | Tier | Value |
|---------|------|-------|
| LUT Validation & Warnings | All | Prevent bad outputs |
| Before/After Analysis | Creator | Vectorscope, waveform tools |
| LUT Quality Score (ΔE2000) | Pro | Professional credibility |

---

## Tier Positioning Strategy

### Free → Creator Conversion Drivers
- Unlimited vs 3/month (primary driver)
- Scene-aware intelligence (Phase 5)
- Professional formats (.3dl, .look)
- Folder organization

### Creator → Pro Conversion Drivers
- Film stock emulation library (Phase 6) - **killer feature**
- All 5 export formats (.xmp Lightroom presets)
- Camera response curves (Phase 6)
- Quality score reports (Phase 9)
- Advanced color spaces (Phase 7)

### Pro → Studio Conversion Drivers
- AI style clustering and search (Phase 8)
- Cross-camera calibration (Phase 8) - **potential standalone product**
- HDR workflow support (Phase 7)
- Team collaboration features
- Priority GPU processing

---

## Implementation Priority

### High Priority (Next 3 months)
1. ⚡ **Dynamic Range Normalization** - Easy win, universal benefit
2. ⚡ **Scene Context Detection** - High perceived value
3. ⚡ **Film Stock Emulation** - Major Pro tier differentiator

### Medium Priority (3-6 months)
1. 🎯 **Camera Response Curves** - Pro workflow essential
2. 🎯 **LUT Quality Score** - Professional credibility
3. 🎯 **Adaptive S-Curve** - Quality improvement

### Long-Term (6-12 months)
1. 🔮 **ML Style Clustering** - Requires infrastructure
2. 🔮 **Cross-Camera Calibration** - Research + dataset
3. 🔮 **HDR Support (JzAzBz)** - Future-proofing

---

## Competitive Advantages

### Current (Phase 1-4)
- ✅ Professional color science (ACEScg, Lab/LCh, filmic curves)
- ✅ Only free tool with unlimited conversions (Creator tier)
- ✅ Multi-format export with tier-based access
- ✅ Skin tone protection

### Phase 5-6
- 🎬 Film stock emulation (unique in market)
- 📷 Camera-specific color science
- 🧠 Scene-aware adaptive grading

### Phase 7-8
- 🔬 Next-gen color spaces (HDR-ready)
- 🤖 AI-powered style recognition
- 🎥 Cross-camera color matching (no competition)

### Phase 9
- ✅ Professional QA metrics (ΔE2000)
- 📊 Quality scoring system
- 🔍 Visual analysis tools

---

## Business Model Evolution

### Current Revenue Streams
1. Free → Creator conversions ($7/mo)
2. Creator → Pro conversions ($12/mo)
3. Pay-per-use overages ($2.50/LUT)

### Future Revenue Opportunities
1. **Premium Film Packs** - $20-40 one-time (Kodak, Fuji, Cinestill collections)
2. **Camera Calibration LUTs** - $50-100 per camera pair (Sony→ARRI, Canon→RED)
3. **Pro tier price increase** - $15-20/mo with film emulation
4. **Studio tier expansion** - $40-50/mo with ML features
5. **Enterprise licensing** - Custom pricing for production companies

---

## Technical Complexity Ratings

### Easy (1-2 weeks)
- Dynamic Range Normalization ⭐
- LUT Validation & Warnings ⭐

### Medium (3-4 weeks)
- Scene Context Detection ⭐⭐
- Adaptive S-Curve ⭐⭐
- Saturation-Luminance Coupling ⭐⭐
- Before/After Analysis ⭐⭐

### Hard (2-3 months)
- Film Stock Emulation ⭐⭐⭐
- Camera Response Curves ⭐⭐⭐
- Perceptual Gamut Compression ⭐⭐⭐
- CAM16 Implementation ⭐⭐⭐
- LUT Quality Score ⭐⭐⭐

### Very Hard (3-6 months)
- JzAzBz HDR Support ⭐⭐⭐⭐
- Neural LUT Refinement ⭐⭐⭐⭐
- Style Clustering (ML) ⭐⭐⭐⭐
- Cross-Camera Calibration ⭐⭐⭐⭐⭐

---

## Next Steps

1. **Validate market demand** - Survey users about film stocks vs ML features
2. **Build datasets** - Collect camera profiles, film scans, professional grades
3. **Prototype quick wins** - Start with Dynamic Range Normalization
4. **Plan infrastructure** - GPU instances for ML, vector DB for style search
5. **Research partnerships** - Film stock licensing, camera manufacturer data

---

## Success Metrics by Phase

### Phase 5-6 (Foundation)
- User satisfaction: >4.5/5 stars
- Pro conversions: +50% from film emulation
- Support tickets: -30% from smarter defaults

### Phase 7-8 (Advanced)
- Studio tier adoption: 10% of Pro users
- Camera calibration revenue: $10k+/month
- ML accuracy: 90%+ vs human colorist

### Phase 9 (Quality)
- Professional user retention: >80%
- Quality score NPS: +60
- Enterprise inquiries: 5+ per month
