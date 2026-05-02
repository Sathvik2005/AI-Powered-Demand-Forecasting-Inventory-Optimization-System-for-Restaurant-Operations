# Contributing Guide

Thank you for your interest in contributing to the Food Demand Forecasting project! 🚀

This document outlines guidelines and procedures for contributing to this project.

---

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Reporting Issues](#reporting-issues)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. We value:
- **Respect**: Treat all contributors with respect
- **Inclusivity**: Welcome people of all backgrounds
- **Collaboration**: Work together to improve the project
- **Professionalism**: Maintain professional communication

### Expected Behavior

✓ Be respectful and constructive  
✓ Welcome differing viewpoints  
✓ Accept criticism gracefully  
✓ Focus on what is best for the project  
✓ Help others feel welcome

### Unacceptable Behavior

✗ Harassment or discrimination  
✗ Disrespectful or inflammatory language  
✗ Trolling or deliberate disruption  
✗ Sharing others' private information  
✗ Other conduct considered inappropriate

---

## Getting Started

### 1. Fork the Repository

```bash
# Visit: https://github.com/yourusername/food-demand-forecasting
# Click "Fork" button in top-right
```

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/food-demand-forecasting.git
cd food-demand-forecasting
```

### 3. Set Up Development Environment

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Install development tools
pip install pytest black flake8 mypy
```

### 4. Add Upstream Remote

```bash
# Add the original repo as upstream
git remote add upstream https://github.com/yourusername/food-demand-forecasting.git

# Verify
git remote -v
```

---

## Development Workflow

### Step 1: Create a Feature Branch

Always create a new branch for your work:

```bash
# Update main from upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
```

**Branch Naming Convention**:
- `feature/xyz` - New feature
- `fix/xyz` - Bug fix
- `docs/xyz` - Documentation
- `refactor/xyz` - Code refactoring

### Step 2: Make Changes

Edit files and make commits:

```bash
# Make changes to files
# ...

# Stage changes
git add .

# Commit with semantic message (see Commit Guidelines)
git commit -m "feature: add support for external temperature variable"

# Repeat as needed
```

### Step 3: Keep Branch Updated

```bash
# Fetch latest changes
git fetch upstream

# Rebase your branch
git rebase upstream/main

# If conflicts, resolve them manually
# Then: git rebase --continue
```

### Step 4: Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### Step 5: Create Pull Request

1. Visit your fork on GitHub
2. Click "Compare & pull request"
3. Fill out PR template (see Pull Request Process)
4. Click "Create pull request"

---

## Coding Standards

### Python Code Style

We follow **PEP 8** with **Black** formatter:

```bash
# Format code
black your_file.py

# Check style
flake8 your_file.py

# Type checking (optional but recommended)
mypy your_file.py
```

### Jupyter Notebook Standards

- ✓ Clear cell headers with markdown
- ✓ Explanatory text for complex operations
- ✓ Output cells cleared before committing (`Cell` → `All Output` → `Clear`)
- ✓ Semantic variable names (not `df1`, `df2`, use `demand_data`, `features`)
- ✓ Docstrings for custom functions

### Documentation Standards

- Use clear, professional language
- Include examples where helpful
- Keep line length ≤ 80 characters
- Use Markdown formatting consistently

### Example: Well-Formatted Function

```python
def calculate_demand_metrics(df: pd.DataFrame, 
                           group_cols: list = None) -> dict:
    """
    Calculate key demand metrics from prepared data.
    
    Args:
        df: DataFrame with demand data
        group_cols: Columns to group by (default: ['center_id', 'meal_id'])
    
    Returns:
        Dictionary with metrics: mean_demand, std, growth_rate
    
    Example:
        >>> metrics = calculate_demand_metrics(data)
        >>> print(metrics['mean_demand'])
        45.23
    """
    if group_cols is None:
        group_cols = ['center_id', 'meal_id']
    
    metrics = {
        'mean_demand': df.groupby(group_cols)['num_orders'].mean(),
        'std_demand': df.groupby(group_cols)['num_orders'].std(),
        # ...
    }
    
    return metrics
```

---

## Commit Guidelines

### Semantic Commit Messages

Use the format: `<type>: <description>`

| Type | Use Case | Example |
|------|----------|---------|
| `data-clean` | Data loading, cleaning | `data-clean: handle missing values in price columns` |
| `eda` | Analysis, visualization | `eda: added decomposition analysis for seasonality` |
| `feature` | Feature engineering | `feature: create rolling average based features` |
| `model` | Model training | `model: implemented XGBoost with grid search` |
| `fix` | Bug fixes | `fix: correct date parsing for edge cases` |
| `tests` | Testing | `tests: add unit tests for feature engineering` |
| `docs` | Documentation | `docs: updated README with Colab instructions` |
| `config` | Setup, dependencies | `config: add kagglehub to requirements.txt` |
| `refactor` | Code restructuring | `refactor: modularize data cleaning functions` |

### Commit Message Guidelines

✓ Use imperative mood: "add feature" not "added feature"  
✓ Don't capitalize first letter  
✓ No period at end  
✓ Limit to 50 characters  
✓ Use body for detailed explanation if needed

### Examples

✅ Good:
```
eda: add weekly demand pattern visualization

- Created bar chart showing weekly patterns
- Found 40% higher demand on weekends
- Investigation for Week 2: holiday correlations
```

❌ Bad:
```
Updated stuff
Fixed things.
WIP - work in progress
```

---

## Pull Request Process

### PR Title Format

Use same semantic format as commits:

```
feature: add support for holiday features in demand forecasting
```

### PR Template

When creating PR, fill out:

```markdown
## Description
Brief overview of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update

## Related Issues
Closes #123

## Changes Made
- Specific change 1
- Specific change 2

## Testing Done
- [ ] Tested locally with sample data
- [ ] Verified with full Kaggle dataset
- [ ] Checked for regressions

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Notebook outputs cleared
- [ ] No sensitive data in commit
```

### Acceptable PR Source

- ✅ Your fork (`your-username/food-demand-forecasting`)
- ✗ Direct edits to main repo
- ✗ Edits from unauthorized collaborators

### PR Requirements

Before PR can be merged:

1. ✅ Passes all checks (no conflicts)
2. ✅ At least 1 reviewer approval
3. ✅ Tests pass (if applicable)
4. ✅ Documentation updated
5. ✅ Commits are semantic
6. ✅ .gitignore working (no .csv, .pkl visible)

---

## Reporting Issues

### Before Opening an Issue

- ✓ Search existing issues first
- ✓ Check if issue applies to your version
- ✓ Verify it's not a duplicate

### Opening an Issue

Use GitHubIssues to report:

1. **Bug Report**:
```markdown
## Bug Description
Clear description of the bug

## To Reproduce
1. Step 1
2. Step 2
3. ...

## Expected Behavior
What should happen

## Actual Behavior
What actually happened

## Environment
- Python version: 3.9
- OS: macOS
- Kaggle: yes/no

## Error Log
```
error message here
```
```

2. **Feature Request**:
```markdown
## Feature Description
What feature would you like?

## Use Case
Why do you need this?

## Acceptance Criteria
- Criterion 1
- Criterion 2

## Suggested Implementation
(optional)
```

### Issue Labels

- 🐛 `bug` - Something isn't working
- ✨ `enhancement` - New feature request
- 📚 `documentation` - Documentation improvements
- 🤔 `question` - Questions or clarification
- 🎯 `good first issue` - Good for beginners
- 🔧 `help wanted` - Help needed
- 📅 `blocked` - Blocked by other issue

---

## Review Process

### For Reviewers

```
1. Read the description and context
2. Check if changes align with project goals
3. Review code quality and style
4. Test changes locally (if significant)
5. Leave constructive feedback
6. Approve or request changes
7. Merge when requirements met
```

### For PR Authors

- Respond to feedback promptly but thoughtfully
- Make requested changes
- Re-request review when complete
- Don't force merge if requested changes

---

## Community Guidelines

### Communication

- Use English in public (issues, PRs, discussions)
- Be respectful even in disagreement
- Include context in questions
- Search before asking (many Q&A in Issues)

### Contribution Levels

| Level | Examples | Recognition |
|-------|----------|-------------|
| Beginner | Fix typos, small docs | Contributor badge |
| Intermediate | Bug fixes, simple features | Co-author in README |
| Expert | Major features, reviews | Maintainer role |

### Recognition

Contributors are recognized:
- In commit message
- In PR merged message
- In CONTRIBUTORS.md file
- Monthly community highlight

---

## Development Tips

### Useful Commands

```bash
# See all branches
git branch -a

# Clean up merged branches
git branch -d feature/xyz

# Revert to upstream
git fetch upstream
git reset --hard upstream/main

# View changes side-by-side
git diff

# Commit amend (fix last commit)
git commit --amend

# Interactive rebase (clean history)
git rebase -i HEAD~3
```

### Testing Your Changes

```bash
# Run all tests
pytest tests/

# Run specific test
pytest tests/test_feature_engineering.py

# Verbose output
pytest -v

# With coverage
pytest --cov=src/
```

### Code Quality Checks

```bash
# Check formatting
black --check .

# Style violations
flake8 .

# Type checking
mypy .

# All checks
black . && flake8 . && mypy . && pytest
```

---

## Resources

| Resource | Link |
|----------|------|
| GitHub Contributing | [github.com/github/docs/blob/main/CONTRIBUTING.md](https://github.com/github/docs/blob/main/CONTRIBUTING.md) |
| PEP 8 Style Guide | [pep8.org](https://www.python.org/dev/peps/pep-0008/) |
| Conventional Commits | [conventionalcommits.org](https://www.conventionalcommits.org) |
| Semantic Versioning | [semver.org](https://semver.org) |

---

## Frequently Asked Questions

**Q: How long does review take?**  
A: Usually 24-48 hours depending on complexity.

**Q: Can I work on multiple features simultaneously?**  
A: Yes! Use separate branches for each feature.

**Q: What if my PR conflicts with main?**  
A: Rebase your branch: `git rebase upstream/main`

**Q: How do I become a maintainer?**  
A: Consistent contributions (10+ merged PRs). Reach out via email!

---

## Questions?

- **For Help**: Open a `question` issue
- **For Suggestions**: Open a `discussion`
- **For Urgent**: Email: maintainer@email.com
- **Community Chat**: Discord (link in README)

---

## Thank You! 🙏

We appreciate all contributions, from code to documentation to bug reports. Together, we're building an amazing open-source project!

---

*Last Updated: January 2024*