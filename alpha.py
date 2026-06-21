import math
import argparse

def get_biased_stats(buckets):
    """
    Calculates Mean and SD while applying the 3x bias to the bottom bucket 
    to account for under-reported lower-end populations.
    """
    latogglebels = ["0-25", "25-50", "50-75", "75-100", "100-125", "125-150", "150-175", "175-200"]
    total_count = 0
    weighted_sum = 0

    # Step 1: Weighted Mean
    for i, count in enumerate(buckets):
        adj_count = count * 2.5 if i == 0 else count
        midpoint = (i * 25) + 12.5
        total_count += adj_count
        weighted_sum += adj_count * midpoint

    mean = weighted_sum / total_count

    # Step 2: Standard Deviation
    variance_sum = 0
    for i, count in enumerate(buckets):
        adj_count = count * 2.5 if i == 0 else count
        midpoint = (i * 25) + 12.5
        variance_sum += adj_count * ((midpoint - mean) ** 2)

    sd = math.sqrt(variance_sum / total_count)
    
    return mean, sd

def run_alpha_engine(score, buckets, p98_score, p99_score):
    # --- STEP 1: Biased Population Stats ---
    biased_mean, biased_sd = get_biased_stats(buckets)
    
    # --- STEP 2: Anchors ---
    p90_anchor = biased_mean + (0.3 * biased_sd)
    print("avg to check against",p90_anchor)
    
    exam_top_percentage = 0.0

    # --- ZONE 1: ELITE ZONE (Above 98%ile) ---
    if score >= p98_score:
        # P99 to 100%ile Interpolation
        if score >= p99_score:
            # Localized Decay for the top 1%
            # We treat p99_score as 1.0% top
            k_elite = 0.04  # Alpha-tuned decay constant
            exam_top_percentage = 1.0 * math.exp(-k_elite * (score - p99_score))
        else:
            # Linear transition between 99%ile (1.0) and 98%ile (2.0)
            t = (score - p98_score) / (p99_score - p98_score)
            exam_top_percentage = 2.0 - (t * (2.0 - 1.0))

    # --- ZONE 2: LOG-K BRIDGE (98%ile to 90%ile) ---
    elif score >= p90_anchor:
        score_diff = p98_score - p90_anchor
        k_bridge = math.log(10.0 / 2.0) / max(1, score_diff)
        distance_to_p98 = p98_score - score
        exam_top_percentage = 2.0 * math.exp(k_bridge * distance_to_p98)

    # --- ZONE 3: THE DYNAMIC BUFFER (P90 to Cliff Edge) ---
    elif score >= (p90_anchor - (0.5 * biased_sd)):
        # Calculate the Cliff Edge: 0.5 SD below your P90 anchor
        cliff_edge = p90_anchor - (0.5 * biased_sd)
        
        # This is your "10 percentile drop" zone.
        # It maps from 10% top (P90) to 20% top (P80) over the buffer width.
        t = (p90_anchor - score) / max(1, p90_anchor - cliff_edge)
        exam_top_percentage = 10.0 + (t * 10.0)

    # --- ZONE 4: THE EXPONENTIAL RUNOFF (The Cliff) ---
    else:
        cliff_edge = p90_anchor - (0.5 * biased_sd)
        distance_below_cliff = cliff_edge - score
        
        # Scale runoff velocity by SD (lower SD = sharper cliff)
        k_runoff = 3.0 / biased_sd 
        
        # Asymptotic curve: Starts at 20% top (80th %ile) and 
        # heads toward the 95% top (5th %ile floor)
        exam_top_percentage = 95.0 - (75.0 * math.exp(-k_runoff * distance_below_cliff))

    # Final Percentile Calculation
    percentile = 100 - exam_top_percentage
    
    # Floor at 5% for the engine
    return max(5.0, min(100.0, percentile))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='JEE 2026 Performance Alpha Engine (CLI)')
    parser.add_argument('score', type=float, help='Enter your marks (0-300)')
    args = parser.parse_args()

    # Data provided by User
    shift_buckets = [1422, 1730, 1461, 1121, 848, 621, 341, 213]
    P98_VAL = 124.7
    P99_VAL = 144.8

    result = run_alpha_engine(args.score, shift_buckets, P98_VAL, P99_VAL)

    print("-" * 40)
    print(f"SCORE: {args.score}")
    print(f"PREDICTED PERCENTILE: {result:.2f}%")
    print("-" * 40)