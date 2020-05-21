const mediaCondition = {
  M: {
    name: "Mint",
    description:
      "<h1>Mint</h1> <h2>Vinyl</h2> <p> Absolutely perfect in every way. Certainly never been played, possibly even still sealed. Should be used sparingly as a grade, if at all. </p> <h2>CD</h2> <p> Perfect. No scuffs/scratches, unplayed - possibly still sealed. Insert/Inlay/Booklet/Sleeve/Digipak: Perfect. No wear, marks, or any other imperfections - possibly still sealed. </p> <h2>Cassette</h2> <p> J-Card is crisp, clean and perfect in every way. Likely sealed. Cassette is brand new, and professionally produced. Used sparingly as a grade, should be free of even the slightest blemishes and/or defects. This grade should be used sparingly, if at all. </p>",
  },
  NM: {
    name: "Near Mint",
    description:
      "<h1>Near Mint</h1> <h2>Vinyl</h2> <p> A nearly perfect record. A NM- record has more than likely never been played, and the vinyl will play perfectly, with no imperfections during playback. Many dealers won't give a grade higher than this implying (perhaps correctly) that no record is ever truly perfect. The record should show no obvious signs of wear. A 45 RPM or EP sleeve should have no more than the most minor defects, such as any sign of slight handling. An LP cover should have no creases, folds, seam splits, cut-out holes, or other noticeable similar defects. The same should be true of any other inserts, such as posters, lyric sleeves, etc. </p> <h2>CD</h2> <p> Near perfect. No obvious signs of use, it may have been played - but it has been handled very carefully. Insert/Inlay/Booklet/Sleeve/Digipak: Near Perfect. No obvious wear, it may have only the slightest of marks from handling. </p> <h2>Cassette</h2> <p> Sleeve should be totally crisp and clean with only the slightest evidence of handling. Tape is likely new, free of any wear or damage. </p>",
  },
  "VG+": {
    name: "Very Good Plus",
    description:
      "<h1>Very Good Plus (VG+)</h1> <h2>Vinyl</h2> <p> Generally worth 50% of the Near Mint value. A Very Good Plus record will show some signs that it was played and otherwise handled by a previous owner who took good care of it. Defects should be more of a cosmetic nature, not affecting the actual playback as a whole. Record surfaces may show some signs of wear and may have slight scuffs or very light scratches that don't affect one's listening experiences. Slight warps that do not affect the sound are OK. The label may have some ring wear or discoloration, but it should be barely noticeable. Spindle marks may be present. Picture sleeves and inner sleeves will have some slight wear, slightly turned-up corners, or a slight seam split. An LP cover may have slight signs of wear, and may be marred by a cut-out hole, indentation, or cut corner. In general, if not for a couple of minor things wrong with it, this would be Near Mint. </p> <h2>CD</h2> <p> A few minor scuffs/scratches. This has been played, but handled with good care - and certainly not abused. Insert/Inlay/Booklet/Sleeve/Digipak: Slight wear, marks, indentations, it may possibly have a cut-out hole (or similar). </p> <h2>Cassette</h2> <p> Sleeve has slight wear, marks, indentations, and/or may possibly have a cut-out hole (or similar). Tape has been taken very good care of and may have light marks or spindle wear. Should play cleanly with minimal noise or degradation. </p>",
  },
  VG: {
    name: "Very Good",
    description:
      "<h1>Very Good (VG)</h1> <h2>Vinyl</h2> <p> Generally worth 25% of Near Mint value. Many of the defects found in a VG+ record will be more pronounced in a VG disc. Surface noise will be evident upon playing, especially in soft passages and during a song's intro and fade, but will not overpower the music otherwise. Groove wear will start to be noticeable, as with light scratches (deep enough to feel with a fingernail) that will affect the sound. Labels may be marred by writing, or have tape or stickers (or their residue) attached. The same will be true of picture sleeves or LP covers. However, it will not have all of these problems at the same time. Goldmine price guides with more than one price will list Very Good as the lowest price. </p> <h2>CD</h2> <p> Quite a few light scuffs/scratches, or several more-pronounced scratches. This has obviously been played, but not handled as carefully as a VG+. Insert/Inlay/Booklet/Sleeve/Digipak: More wear, marks, indentations than a VG+. May have slight fading, a small tear/rip, or some writing. </p> <h2>Cassette</h2> <p> Sleeve will contain more wear, marks, and/or indentations than a VG+. May have slight fading, a small tear/rip, or some writing. Shell may have heavier marks and wear than VG including plastic discoloration. Should play with some stronger hiss or degradation, but not enough to overpower music. </p>",
  },
  G: {
    name: "Good",
    description:
      "<h1>Good (G)</h1> <h2>Vinyl</h2> <p> Generally worth 10-15% of the Near Mint value. A record in Good or Good Plus condition can be played through without skipping. But it will have significant surface noise, scratches, and visible groove wear. A cover or sleeve will have seam splits, especially at the bottom or on the spine. Tape, writing, ring wear, or other defects will be present. While the record will be playable without skipping, noticeable surface noise and ticks will almost certainly accompany the playback. </p> <h2>CD</h2> <p> There are a lot of scuffs/scratches. However it will still play through without problems. This has not been handled with much care at all. Insert/Inlay/Booklet/Sleeve/Digipak: Well worn, marked, more obvious indentations, fading, writing, than a VG - possibly a more significant tear/rip. </p> <h2>Cassette</h2> <p> Sleeve will be well worn, marked, and contain obvious indentations, fading, and/or writing, more so than a VG grade - possibly a more significant tear/rip. Tape will have heavy wear on shell. Felt stopper may be missing. Tape may have minor creasing, but not broken. Must play through, may have heavier degradation that will overpower music. </p>",
  },
  P: {
    name: "Poor",
    description:
      "<h1>Poor (P)</h1> <h2>Vinyl</h2> <p> Generally worth 0-5% of the Near Mint price. The record is cracked, badly warped, and won't play through without skipping or repeating. The picture sleeve is water damaged, split on all three seams and heavily marred by wear and writing. The LP cover barely keeps the LP inside it. Inner sleeves are fully split, crinkled, and written upon. </p> <h2>CD</h2> <p> The CD (if it is included) may or may not play some or all of the tracks. See the seller's comments for details. Insert/Inlay/Booklet/Sleeve/Digipak: Very worn. It may have obvious writing on it, it may be ripped/torn, or significantly faded, or water damaged. </p> <h2>Cassette</h2> <p> Sleeve will be torn, heavily stained, showing general heavy damage, or will be partially missing. Likewise, tape will be heavily damaged, showing complete fading on the face, crinkled tape, missing screws or teeth, staining, and other heavy wear. Cassette will more than likely not play through. Standard Jewel Cases: Standard Jewel Cases are not graded as they are replaceable. </p>",
  },
};

module.exports = mediaCondition;
