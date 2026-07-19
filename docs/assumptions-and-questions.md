# Questions & Design Decisions

These are questions I identified while implementing the solution. Where requirements were ambiguous, I made reasonable assumptions to allow development to continue.

## Questions

- Are distances limited to non-negative whole numbers, or should negative and/or fractional values be accepted?
- Should parsing stop at the first invalid command, or report all validation errors at once?
- Should depth be allowed to become negative, or should it be constrained to zero?
- Are commands expected to be case-sensitive?

## Design Decisions

- Commands are treated as case-insensitive.
- Leading, trailing, and repeated whitespace is ignored.
- Blank lines are ignored.
- Distances are currently limited to non-negative whole numbers based on the examples provided.
- Navigation commands are assumed to be processed sequentially in the order received.
